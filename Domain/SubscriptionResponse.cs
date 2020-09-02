
using System;
namespace Domain
{
    public class SubscriptionResponse
    {
        public SubscriptionResponse()
        {
            Latest_Invoice = new Invoice();
        }

        public string Id { get; set; }

        public string CustomerId { get; set; }

        public string PaymentMethodId { get; set; }

        public string InvoiceId { get; set; }

        public DateTime StartDate { get; set; }

        public decimal? Price { get; set; }

        public long? Quantity { get; set; }

        public string Status { get; set; }

        public Invoice Latest_Invoice { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string Subscription { get; set; }

    }
}
