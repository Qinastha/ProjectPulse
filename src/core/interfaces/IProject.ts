import { IUser } from "../../store/userSlice";
import { UserPosition } from "../types/userPosition";
import { TaskStatus } from "../types/taskStatus";
import { ITaskChecklistItem } from "./ITaskChecklistStatus";

export interface IMember {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  position?: string;
  avatar?: string;
}

export interface ITasks {
  taskDepartment: UserPosition;
  taskStatus: TaskStatus;
  creator: IUser;
  members: IMember[];
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
  creator: IMember;
  members: IMember[];
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
  taskLists: ITasks[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrentProject extends IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  members: IMember[];
  taskLists: ITaskList[];
  currentTaskListId: string | null;
  currentTaskId: string | null;
}
