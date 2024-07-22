export interface IMember {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  position?: string;
  avatar?: string;
}

export interface ITasks {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskStatus: string;
}

export interface IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  creator: IMember;
  members: IMember[];
  tasks: ITasks[];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  isCompleted: boolean;
  lists: CurrentProjectList[];
}

export interface CurrentProjectList {
  id: string;
  listName: string;
}

export interface CurrentProject extends IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  members: IMember[];
  lists: CurrentProjectList[];
}
