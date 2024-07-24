import { IMember } from "./IProject";
import { ITaskChecklistItem } from "./ITaskChecklistStatus";
import { UserPosition } from "../types/userPosition";
import { TaskStatus } from "../types/taskStatus";

export interface TaskFormData {
  title: string;
  description: string;
  members: IMember[];
  checkList: ITaskChecklistItem[];
  deadLine: Date;
  taskDepartment: UserPosition;
  taskStatus: TaskStatus;
}
