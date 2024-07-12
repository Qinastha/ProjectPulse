export interface IMember {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  positio?: string;
  avatar?: string;
}

export interface IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  creator: IMember;
  members: IMember[];
  tasks: null[];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  isCompleted: boolean;
}

export interface CurrentProject extends IProject {
  _id: string;
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
}
