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
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Postcode { get; set; }
        public string Country { get; set; }
        public DateTime DBO { get; set; }
        public string GroupName { get; set; }
        public string Level { get; set; }
        public int TrainingYears { get; set; }
        public string PriceId { get; set; }
        public string CustomerId { get; set; }
        public string Subscribtion { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime LastPayment { get; set; }
        public string InvoiceId { get; set; }
        public string SessionId { get; set; }
        public bool IsAdmin { get; set; }
     
    }
}