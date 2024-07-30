import { UserPosition } from "../types/userPosition";
import { TaskStatus } from "../types/taskStatus";
import { IUser } from "./IUser";
import { ITaskChecklistItem } from "./ITaskChecklistStatus";

export interface ITasks {
  _id: string;
  taskDepartment: UserPosition;
  taskStatus: TaskStatus;
  creator: IUser;
  members: IUser[];
  title: string;
  description: string;
  checkList: ITaskChecklistItem[];
  comments: [];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  deadLine: Date;
}
