export interface IMember {
  firstName: string;
  lastName: string;
  userName: string;
}

export interface IProject {
  projectName: string;
  projectDescription: string;
  projectAvatar: string;
  creator: null;
  members: IMember[];
  tasks: null[];
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  completedAt: Date;
  isCompleted: boolean;
}
