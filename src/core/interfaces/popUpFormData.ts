import { IUser } from "./IUser";

export interface PopUpFormData {
  projectName: string;
  projectDescription: string;
  projectAvatar: string | null;
  members: IUser[];
}
