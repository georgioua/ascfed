using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dotnet.Controllers
{
    public class BillingController : Controller
    {
        //private readonly IOptions<StripeOptions> options;

        public BillingController()
        {
            //this.options = options;
            //StripeConfiguration.ApiKey = options.Value.SecretKey;
        }

        [AllowAnonymous]
        [HttpGet("config")]
        public ActionResult<ConfigResponse> GetConfig()
        {
            return new ConfigResponse
            {
                PublishableKey = "pk_test_51H961DIHls7iQOHV2FLwRuMHdUvxVstlhJTavVSIxu088cnJy2SEiSbA3jjn8PHFlJbSuDA98c2nja5xgZrIho9R00aceLsEK0",
            };
        }
        [AllowAnonymous]
        [HttpPost("create-customer")]
        public ActionResult<string> CreateCustomer([FromBody] CreateCustomerRequest req)
        {
            var options = new CustomerCreateOptions
            {
                Email = req.Email,
            };
            var service = new CustomerService();
            var customer = service.Create(options);
           
            return customer.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("create-subscription")]
        public ActionResult<string> CreateSubscription([FromBody] CreateSubscriptionRequest req)
        {
            var priceServvice = new PriceService();
            var price = priceServvice.Get(req.PriceId);

            // Attach payment method
            var paymentOptions = new PaymentMethodAttachOptions
            {
                Customer = req.CustomerId,
            };
            var paymentService = new PaymentMethodService();
            var paymentMethod = paymentService.Attach(req.PaymentMethodId, paymentOptions);

            // Update customer's default invoice payment method
            var customerOptions = new CustomerUpdateOptions
            {
                InvoiceSettings = new CustomerInvoiceSettingsOptions
                {
                    DefaultPaymentMethod = paymentMethod.Id,
                },
            };
            var customerService = new CustomerService();
            customerService.Update(req.CustomerId, customerOptions);

            var options = new SubscriptionCreateOptions
            {
                Customer = req.CustomerId,
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions
                    {
                        Price = req.PriceId,
                    },
                },
            };
            options.AddExpand("latest_invoice.payment_intent");
            try
            {
                var service = new SubscriptionService();
                var subscription = service.Create(options);
                
                return subscription.ToJson();

            }
            catch (StripeException e)
            {
                Console.WriteLine($"Failed to create subscription.{e}");
                return BadRequest();
            }
           
        }
        [AllowAnonymous]
        [HttpPost("retry-invoice")]
        public ActionResult<string> RetryInvoice([FromBody] RetryInvoiceRequest req)
        {
            // Attach payment method
            var options = new PaymentMethodAttachOptions
            {
                Customer = req.CustomerId,
            };
            var service = new PaymentMethodService();
            var paymentMethod = service.Attach(req.PaymentMethodId, options);

            // Update customer's default invoice payment method
            var customerOptions = new CustomerUpdateOptions
            {
                InvoiceSettings = new CustomerInvoiceSettingsOptions
                {
                    DefaultPaymentMethod = paymentMethod.Id,
                },
            };
            var customerService = new CustomerService();
            customerService.Update(req.CustomerId, customerOptions);

            var invoiceOptions = new InvoiceGetOptions();
            invoiceOptions.AddExpand("payment_intent");
            var invoiceService = new InvoiceService();
            Stripe.Invoice invoice = invoiceService.Get(req.InvoiceId, invoiceOptions);
            return invoice.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("retrieve-upcoming-invoice")]
        public ActionResult<string> RetrieveUpcomingInvoice([FromBody] RetrieveUpcomingInvoiceRequest req)
        {
            var service = new SubscriptionService();
            var subscription = service.Get(req.Subscription);

            var invoiceService = new InvoiceService();
            var options = new UpcomingInvoiceOptions
            {
                Customer = req.Customer,
                Subscription = req.Subscription,
                SubscriptionItems = new List<InvoiceSubscriptionItemOptions>
                {
                    new InvoiceSubscriptionItemOptions
                    {
                        Id = subscription.Items.Data[0].Id,
                        Deleted = true,
                    },
                    new InvoiceSubscriptionItemOptions
                    {
                        // TODO: This should be Price, but isnt in Stripe.net yet.
                        Plan = Environment.GetEnvironmentVariable(req.NewPrice),
                        Deleted = false,
                    },
                }
            };
            Stripe.Invoice upcoming = invoiceService.Upcoming(options);
            return upcoming.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("cancel-subscription")]
        public ActionResult<string> CancelSubscription([FromBody] CancelSubscriptionRequest req)
        {
            var service = new SubscriptionService();
            var subscription = service.Cancel(req.Subscription, null);
            return subscription.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("update-subscription")]
        public ActionResult<string> UpdateSubscription([FromBody] UpdateSubscriptionRequest req)
        {
            var service = new SubscriptionService();
            var subscription = service.Get(req.Subscription);

            var options = new SubscriptionUpdateOptions
            {
                CancelAtPeriodEnd = false,
                Items = new List<SubscriptionItemOptions>
                {
                    new SubscriptionItemOptions
                    {
                        Id = subscription.Items.Data[0].Id,
                        Price = Environment.GetEnvironmentVariable(req.NewPrice),
                    }
                }
            };
            var updatedSubscription = service.Update(req.Subscription, options);
            return updatedSubscription.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("retrieve-customer-payment-method")]
        public ActionResult<string> RetrieveCustomerPaymentMethod([FromBody] RetrieveCustomerPaymentMethodRequest req)
        {
            var service = new PaymentMethodService();
            var paymentMethod = service.Get(req.PaymentMethodId);
            return paymentMethod.ToJson();
        }
        [AllowAnonymous]
        [HttpPost("stripe-webhook")]
        public async Task<IActionResult> Webhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    "sk_test_51H961DIHls7iQOHV1BVTaKJS3iDis1ug5nErlowXC6foFEUPecnX9rSS9tYMPuknCf9LzJhFNNyjw13GuX0CrxwM00lPEnNTL2"
                );
                Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Something failed {e}");
                return BadRequest();
            }

            if (stripeEvent.Type == "invoice.paid")
            {
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate
                // limits.
            }
            if (stripeEvent.Type == "invoice.payment_failed")
            {
                // If the payment fails or the customer does not have a valid payment method,
                // an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
            }
            if (stripeEvent.Type == "invoice.finalized")
            {
                // If you want to manually send out invoices to your customers
                // or store them locally to reference to avoid hitting Stripe rate limits.
            }
            if (stripeEvent.Type == "customer.subscription.deleted")
            {
                // handle subscription cancelled automatically based
                // upon your subscription settings. Or if the user cancels it.
            }
            if (stripeEvent.Type == "customer.subscription.trial_will_end")
            {
                // Send notification to your user that the trial will end
            }

            return Ok();
        }
    }
}