import { ITaskChecklistItem } from "./ITaskChecklistStatus";
import { UserPosition } from "../types/userPosition";
import { TaskStatus } from "../types/taskStatus";
import { IUser } from "./IUser";

export interface TaskFormData {
  title: string;
  description: string;
  members: IUser[];
  checkList: ITaskChecklistItem[];
  deadLine: Date;
  taskDepartment: UserPosition;
  taskStatus: TaskStatus;
}
