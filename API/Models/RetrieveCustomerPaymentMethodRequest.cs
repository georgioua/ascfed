using Newtonsoft.Json;

public class RetrieveCustomerPaymentMethodRequest
{
    [JsonProperty("paymentMethodId")]
    public string PaymentMethodId { get; set; }
}