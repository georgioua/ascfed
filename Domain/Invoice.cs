using System;
using System.Collections.Generic;

namespace Domain
{
    public class Invoice
    {
        public Invoice()
        {
            Payment_Intent = new PaymentIntent();
        }

        public string Id { get; set; }
        public PaymentIntent Payment_Intent { get; set; }

    }

    public class PaymentIntent
    {

        public string Id { get; set; }

        public string Client_Secret { get; set; }

        public string Status { get; set; }

    }



}
