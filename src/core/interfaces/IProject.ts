import { UserPosition } from "../types/userPosition";
import { TaskStatus } from "../types/taskStatus";
import { ITaskChecklistItem } from "./ITaskChecklistStatus";
import { IUser } from "./IUser";

export interface ITasks {
  _id: string;
  taskDepartment: UserPosition;
  taskStatus: TaskStatus;
  creator: IUser;
  members: IUser[];
  title: string;
  description: string;
  checklist: ITaskChecklistItem[];
  comments: [];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  deadLine: Date;
}

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

export interface ITaskList {
  _id: string;
  taskListName: string;
  tasks: ITasks[];
  createdAt: Date;
  updatedAt: Date;
}
