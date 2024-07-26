import React from "react";
import { IProject, ITaskList, ITasks } from "../../core";
import { useAppSelector } from "../../hooks";
import { getProjectStatus } from "../../store/projectSlice";
import { FallbackLoader } from "../FallBackLoader/FallbackLoader";

interface ProjectTaskListProps {
  project: IProject;
  deleteList: (_id: string) => void;
  openEditList: (_id: string) => void;
  openAddTask: (listId: string) => void;
  openEditTask: (listId: string, taskId: string) => void;
  deleteTask: (projectId: string, listId: string, taskId: string) => void;
}

export const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  project,
  deleteList,
  openEditList,
  openAddTask,
  openEditTask,
  deleteTask,
}) => {
  const status = useAppSelector(getProjectStatus);
  return (
    <>
      {status !== "resolved" && project ? (
        <FallbackLoader />
      ) : (
        <>
          {project.taskLists.length! > 0 && (
            <>
              {project.taskLists! ? (
                project.taskLists!.map((list: ITaskList, index: number) => (
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
                    <div className="taskContainer__tasks">
                      {list.tasks && list.tasks.length > 0 ? (
                        list.tasks.map((task: ITasks, index: number) => (
                          <div
                            key={index}
                            className="taskContainer__task--item">
                            <span onClick={() => console.log("show project")}>
                              {task.title}
                            </span>
                            <div className="task--actions">
                              <button
                                className="editTask--button"
                                onClick={() =>
                                  openEditTask(list._id, task._id)
                                }>
                                Edit
                              </button>
                              <button
                                className="deleteTask--button"
                                onClick={() =>
                                  deleteTask(project._id, list._id, task._id)
                                }>
                                X
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No tasks available. Please add a new one</p>
                      )}
                      <div className="delimiter"></div>
                      <div className="addTaskButtonContainer">
                        <button
                          className="addTask--button"
                          onClick={() => openAddTask(list._id)}>
                          Add New Task
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No lists available. Please add a new one</p>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
