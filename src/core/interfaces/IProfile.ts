import { UserAddress } from "./userAdress";

export interface IProfile {
  avatar: string | null;
  phoneNumber: string;
  gender: string;
  address: UserAddress;
  language: string;
  timeZone: string;
}
