using System;
namespace Application.User
{
    public class User
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public string PriceId { get; set; }
        public string CustomerId { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsPaid { get; set; }
        public bool IsRegistered { get; set; }
        public string TempPassword { get; set; }
        public string SubscriptionStatus { get; set; }
        public string PaymentIntentStatus { get; set; }
        public string InvoiceId { get; set; }
        public string PaymentMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string Subscription { get; set; }
        public string AmountPaid { get; set; }
        public string Period { get; set; }

    }
}