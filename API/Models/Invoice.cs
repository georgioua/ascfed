using System;
using System.Collections.Generic;
using Newtonsoft.Json;
namespace API.Models
{
    public class Invoice
    {
        public Invoice()
        {
            Payment_Intent = new PaymentIntent();
        }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("payment_intent")]
        public PaymentIntent Payment_Intent { get; set; }

}
    [JsonObject("payment_intent")]
    public class PaymentIntent
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("client_secret")]
        public string Client_Secret { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        
    }



}
