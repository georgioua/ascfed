import { IAddress } from "./address";
import { ICapoeiraInformation } from "./capoeiraInformation";

export interface IUser {
    username: string;
    displayName: string;
    token: string;
    refreshToken: string;
    image?: string;
    address: IAddress;
    info?: ICapoeiraInformation;
    isAdmin : boolean;
    isPaid: boolean;

}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    groupName?: string;
    level?: string;
    trainingYears?: string;
    dob: Date;
    addressLine1: string;
    addressline2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    priceId: string;
    customerId?: string;
}