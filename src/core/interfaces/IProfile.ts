import { UserAddress } from "./userAdress";

export interface IProfile {
  avatar: File | null;
  phoneNumber: string;
  gender: string;
  address: UserAddress;
  language: string;
  timeZone: string;
}
