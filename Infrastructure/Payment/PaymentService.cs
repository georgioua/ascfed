using System;
using Stripe;
using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Payment
{
    public class PaymentService :IPaymentService
    {
        public PaymentService(IConfiguration config)
        {
          
        }
        public async Task<string> CreateCustomerAsync(string email)
        {
            var options = new CustomerCreateOptions
            {
                Email = email,
            };
            var service = new CustomerService();
            var customer = await service.CreateAsync(options);

            return customer.Id;

        }
        public async Task<string> CreateCustomerAsync(AppUser user)
        {
            var options = new CustomerCreateOptions
            {
                Email = user.Email,
                Phone = user.Phone,
                Name = user.Name,
                Address = new AddressOptions() {
                    Line1 = user.AddressLine1,
                    Line2 = user.AddressLine2,
                    State = user.State,
                    City = user.City,
                    Country = user.Country,
                    PostalCode = user.Postcode
                },
                Metadata = new Dictionary<string, string>() {
                    {"TrainingYears", user.TrainingYears.ToString() },
                    {"GroupName", user.GroupName },
                    {"Level", user.Level }
                },
            };
            var service = new CustomerService();
            var customer = await service.CreateAsync(options);

            return customer.ToJson();
           
        }
        public async Task<string> GetCustomerEmailAsync(string customerId)
        {
    
            var service = new CustomerService();
            var customer = await service.GetAsync(customerId);
            return customer.Email;
        }
        public async Task<bool> UpdateCustomer(AppUser user)
        {
            try
            {
                var service = new CustomerService();

                var options = new CustomerUpdateOptions
                {
                    Email = user.Email,
                    Phone = user.Phone,
                    Name = user.Name,
                    Address = new AddressOptions()
                    {
                        Line1 = user.AddressLine1,
                        Line2 = user.AddressLine2,
                        State = user.State,
                        City = user.City,
                        Country = user.Country,
                        PostalCode = user.Postcode
                    },
                    Metadata = new Dictionary<string, string>() {
                    {"TrainingYears", user.TrainingYears.ToString() },
                    {"GroupName", user.GroupName },
                    {"Level", user.Level }
                },
                };

                await service.UpdateAsync(user.CustomerId, options);

                return true;

            }
            catch(StripeException e)
            {
                throw e;

            }
        }

        public string CreateCustomer(AppUser user)
        {
            var options = new CustomerCreateOptions
            {
                Email = user.Email,
                Phone = user.Phone,
                Name = user.Name,
                Address = new AddressOptions()
                {
                    Line1 = user.AddressLine1,
                    Line2 = user.AddressLine2,
                    State = user.State,
                    City = user.City,
                    Country = user.Country,
                    PostalCode = user.Postcode
                },
                Metadata = new Dictionary<string, string>() {
                    {"TrainingYears", user.TrainingYears.ToString() },
                    {"GroupName", user.GroupName },
                    {"Level", user.Level }
                },
            };
            var service = new CustomerService();

            var customer =  service.Create(options);

            return customer.Id;
        }
        //public async Task<SubscriptionResponse> ConfirmPayment()
        //{

        //}
        public async Task<SubscriptionResponse> CreateSubscription(CreateSubscriptionRequest req)
        {
            var priceServvice = new PriceService();
            var price = priceServvice.Get(req.PriceId);
            var customerService = new CustomerService();

            var customer = await customerService.GetAsync(req.CustomerId);

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
                var subscription = await service.CreateAsync(options);
                
                var response = new SubscriptionResponse()
                {
                    Id = subscription.Id,
                    CustomerId = subscription.CustomerId,
                    InvoiceId = subscription.LatestInvoiceId,
                    PaymentMethodId = subscription.DefaultPaymentMethodId,
                    StartDate = subscription.StartDate,
                    Price = price.UnitAmountDecimal,
                    Quantity = subscription.Quantity,
                    Status = subscription.Status,
                    Email = customer.Email,
                    Name = customer.Name ?? "",
                    Subscription = price.Product != null ?  price.Product.Name : "",
                    Latest_Invoice = new Domain.Invoice
                    {
                        Id = subscription.LatestInvoice.Id,
                        Payment_Intent = new Domain.PaymentIntent
                        {
                            Id = subscription.LatestInvoice.PaymentIntent.Id,
                            Status = subscription.LatestInvoice.PaymentIntent.Status,
                            Client_Secret = subscription.LatestInvoice.PaymentIntent.ClientSecret
                        }
                    }
                    

                };
                return response;
            }
            catch (StripeException e)
            {
                throw e;
            }

        }
        
    }
}
