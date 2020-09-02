export interface IPayment {
    priceId: string;
    customerId: string;
    price: string;
    decription: string;

}


export interface IPaymentFormValues {
    priceId: string;
    customerId: string;
    paymentMethodId: string;
}