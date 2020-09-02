
export interface ISubscription {
    priceId: string;
    customerId: string;
    price: string;
    decription: string;
    paymentIntentId: string;
    clientSecret: string;
    status: string;
    invoiceId: string;
}

export interface ISubscriptionFormValues {
    priceId: string;
    customerId: string;
    paymentMethodId: string;
}

export interface IRetryInvoiceRequest { 
    customerId: string;
    paymentMethodId: string;
    invoiceId: string;
}