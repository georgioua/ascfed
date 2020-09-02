
export interface IUser {
    username: string;
    displayName: string;
    token: string;
    refreshToken: string;
    image?: string;
    priceId?: string;
    customerId?: string;
    isAdmin : boolean;
    isPaid: boolean;
    isRegistered: boolean;
    tempPassword: string;
    subscriptionStatus: string;
    paymentIntentStatus: string;
    invoiceId: string;
    paymentMethodId: string;
    clientSecret: string;
    subscription: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    groupName?: string;
    level?: string;
    trainingYears?: string;
    dob?: Date;
    addressLine1: string;
    addressline2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    customerId?: string;
    phone: string;
}