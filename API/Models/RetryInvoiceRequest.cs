using Newtonsoft.Json;

public class RetryInvoiceRequest
{
    [JsonProperty("customerId")]
    public string CustomerId { get; set; }

    [JsonProperty("paymentMethodId")]
    public string PaymentMethodId { get; set; }

    [JsonProperty("invoiceId")]
    public string InvoiceId { get; set; }
}