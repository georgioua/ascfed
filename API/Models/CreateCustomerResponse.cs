using Newtonsoft.Json;
using Stripe;

public class CreateCustomerResponse
{
    [JsonProperty("customer")]
    public string Customer { get; set; }
}