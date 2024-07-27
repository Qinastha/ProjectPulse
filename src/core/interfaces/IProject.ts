import { IUser } from "./IUser";
import { ITaskList } from "./ITaskList";

export interface IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  creator: IUser;
  members: IUser[];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  isCompleted: boolean;
  taskLists: ITaskList[];
}
