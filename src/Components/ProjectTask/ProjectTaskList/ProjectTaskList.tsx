import React from "react";
import { FallbackLoader, IProject, ITaskList, ITasks } from "../../../core";
import { useAppSelector } from "../../../hooks";
import { getProjectStatus } from "../../../store/projectSlice";
import "./ProjectTaskList.scss";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTheme } from "../../../core/contexts/ThemeContext";

interface ProjectTaskListProps {
  project: IProject;
  deleteList: (_id: string) => void;
  openEditList: (_id: string) => void;
  openAddTask: (listId: string) => void;
  openEditTask: (listId: string, taskId: string) => void;
  openPreviewTask: (listId: string, taskId: string) => void;
  deleteTask: (projectId: string, listId: string, taskId: string) => void;
}

export const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  project,
  deleteList,
  openEditList,
  openAddTask,
  openEditTask,
  openPreviewTask,
  deleteTask,
}) => {
  const status = useAppSelector(getProjectStatus);
  const { theme } = useTheme()!;
  return (
    <>
      {status !== "resolved" && project ? (
        <FallbackLoader />
      ) : (
        <>
          {project.taskLists.length > 0 ? (
            <>
              {project.taskLists &&
                project.taskLists.map((list: ITaskList, index: number) => (
                  <div key={index} className={`taskContainer--item ${theme}`}>
                    <div className="listHeader">
                      <div className="listHeader--text">
                        {list.taskListName}
                        <button
                          className={`editList--button ${theme}`}
                          onClick={() => openEditList(list._id)}>
                          &#x270E;
                        </button>
                      </div>
                      <div className="list--actions">
                        <button
                          className={`deleteList--button ${theme}`}
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
                            className={`taskContainer__task--item ${theme}`}>
                            <div
                              className="taskContainer__task-text"
                              onClick={() =>
                                openPreviewTask(list._id, task._id)
                              }>
                              {task.title}
                            </div>
                            <div className="task--actions">
                              <button
                                className={`editTask--button ${theme}`}
                                onClick={() =>
                                  openEditTask(list._id, task._id)
                                }>
                                <EditOutlinedIcon style={{ fontSize: 20 }} />
                              </button>
                              <button
                                className={`deleteTask--button ${theme}`}
                                onClick={() =>
                                  deleteTask(project._id, list._id, task._id)
                                }>
                                <DeleteOutlineOutlinedIcon
                                  style={{ fontSize: 20 }}
                                />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="taskList--placeholder">
                          No tasks available. Please add a new one
                        </p>
                      )}
                      <div className="addTaskButtonContainer">
                        <button
                          className="addTask--button"
                          onClick={() => openAddTask(list._id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <p>No task lists available.</p>
          )}
        </>
      )}
    </>
  );
};
