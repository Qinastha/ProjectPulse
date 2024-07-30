import { IProfile } from "./IProfile";
import { UserPosition } from "../types/userPosition";
import { UserRole } from "../types/userRole.type";

export interface IUser {
  email: string;
  password: string;
  role: UserRole | null;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: Date | string;
  position: UserPosition | null;
  profile: IProfile | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastActiveAt: Date | null;
}
