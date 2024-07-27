import { ITasks } from "./ITasks";

export interface ITaskList {
  _id: string;
  taskListName: string;
  tasks: ITasks[];
  createdAt: Date;
  updatedAt: Date;
}
