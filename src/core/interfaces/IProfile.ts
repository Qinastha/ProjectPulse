import { UserAddress } from "./userAdress";

export interface IProfile {
  avatar: string;
  phoneNumber: string;
  gender: string;
  address: UserAddress;
  language: string;
  timeZone: string;
}
