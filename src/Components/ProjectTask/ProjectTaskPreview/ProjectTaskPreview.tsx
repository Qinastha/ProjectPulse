import React, { useEffect } from "react";
import { PopUpProps } from "../../PopUp/PopUp";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCurrentProject,
  getCurrentTaskId,
  getCurrentTaskListId,
  setCurrentTaskId,
  setCurrentTaskListId,
} from "../../../store/projectSlice";
import { ITaskList, ITasks, TaskFormData } from "../../../core";
import "./ProjectTaskPreview.scss";
import { TaskPreview } from "./TaskPreview";

export const ProjectTaskPreview: React.FC<PopUpProps> = ({
  handleClosePopUp,
}) => {
  const dispatch = useAppDispatch();
  const { _id, taskLists } = useAppSelector(getCurrentProject)!;
  const currentTaskListId = useAppSelector(getCurrentTaskListId)!;
  const currentTaskId = useAppSelector(getCurrentTaskId)!;
  const task = taskLists
    .find((list: ITaskList) => list._id === currentTaskListId)!
    .tasks.find((task: ITasks) => task._id === currentTaskId)!;

  // const initialCheckList: ITaskChecklistItem[] = task?.checkList || [];
  // const [checkList, setCheckList] = useState(
  //     initialCheckList.map((item: ITaskChecklistItem) =>
  //         ({...item})));
  //
  // const handleCheckListChange = (index: number) => {
  //     const updatedCheckList = checkList.map((item, i) =>
  //         i === index ? {...item, isCompleted: !item.isCompleted} : item
  //     );
  //     setCheckList(updatedCheckList);
  // };
  //
  // const handleTasksChange = async () => {
  //     try {
  //         const response = await
  //             putData(`project/${_id}/taskList/${currentTaskListId}/task/${currentTaskId}`, taskData)
  //         if (response?.value) {
  //             console.log(response.value);
  //             dispatch(setProject(response.value));
  //             handleClosePopUp();
  //         }
  //     } catch (error) {
  //         console.error("Error during updating project:", error);
  //     }
  // }

  const taskData: TaskFormData = {
    title: task?.title,
    description: task?.description,
    members: task?.members,
    checkList: task?.checkList,
    deadLine: task?.deadLine,
    taskDepartment: task?.taskDepartment,
    taskStatus: task?.taskStatus,
  };

  useEffect(() => {
    return () => {
      dispatch(setCurrentTaskListId(null));
      dispatch(setCurrentTaskId(null));
    };
  }, [dispatch]);

  return (
    <div className="previewTask">
      <TaskPreview taskData={taskData} handleClosePopUp={handleClosePopUp} />
    </div>
  );
};
