using Newtonsoft.Json;
namespace Api.Models
{
    public class CreateSubscriptionRequest
    {
        [JsonProperty("paymentMethodId")]
        public string PaymentMethodId { get; set; }

        [JsonProperty("customerId")]
        public string CustomerId { get; set; }

        [JsonProperty("priceId")]
        public string PriceId { get; set; }
    }
}
