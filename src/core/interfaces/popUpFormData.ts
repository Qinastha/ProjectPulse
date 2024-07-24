import { IMember } from "./IProject";

export interface PopUpFormData {
  projectName: string;
  projectDescription: string;
  projectAvatar: string | null;
  members: IMember[];
}
