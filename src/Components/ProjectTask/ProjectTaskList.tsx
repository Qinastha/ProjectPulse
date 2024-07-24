import React from "react";
import { CurrentProject, ITaskList } from "../../core";

interface ProjectTaskListProps {
  project: CurrentProject;
  deleteList: (_id: string) => void;
  openEditList: (_id: string) => void;
  openAddTask: () => void;
}

export const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  project,
  deleteList,
  openEditList,
  openAddTask,
}) => {
  const taskList = project?.taskLists || [];
  return (
    <>
      {taskList && (
        <>
          {taskList.length > 0 ? (
            taskList.map((list: ITaskList, index) => (
              <div key={index} className="taskContainer--item">
                <div className="listHeader">
                  <span>{list.taskListName} </span>
                  <div className="list--actions">
                    <button
                      className="editList--button"
                      onClick={() => openEditList(list._id)}>
                      &#x270E;
                    </button>
                    <button
                      className="deleteList--button"
                      onClick={() => deleteList(list._id)}>
                      &#x232B;
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="addTask--button"
                    onClick={() => openAddTask()}>
                    Add New Task
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No lists available. Please add a new one</p>
          )}
        </>
      )}
    </>
  );
};
