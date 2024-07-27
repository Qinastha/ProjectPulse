import React from "react";
import { ITaskChecklistItem, IUser, TaskFormData } from "../../../core";

interface TaskPreviewProps {
  taskData: TaskFormData;
  handleClosePopUp: () => void;
}

export const TaskPreview: React.FC<TaskPreviewProps> = ({
  taskData,
  handleClosePopUp,
}) => {
  return (
    <>
      <h2 className="previewTask__header">Task Preview</h2>
      <div className="previewTask__content">
        <div className="previewTask__field">
          <strong>Title: </strong> <span>{taskData.title}</span>
        </div>
        <div className="previewTask__field">
          <strong>Description: </strong> <span>{taskData.description}</span>
        </div>
        <div className="previewTask__field">
          <strong>Members:</strong>
          <ul className="previewTask__field">
            {taskData.members?.map((member: IUser, index) => (
              <li key={index}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        </div>
        <div className="previewTask__field">
          <strong>Check List:</strong>
          <ul className="previewTask__field">
            {taskData.checkList?.map((item: ITaskChecklistItem, index) => (
              <li key={index}>
                {item.text} {item.isCompleted}
              </li>
            ))}
          </ul>
        </div>
        <div className="previewTask__field">
          <strong>Deadline: {""}</strong>
          <span>
            {taskData.deadLine
              ? new Date(taskData.deadLine).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="previewTask__field">
          <strong>Department:</strong> <span>{taskData.taskDepartment}</span>
        </div>
        <div className="previewTask__field">
          <strong>Status:</strong> <span>{taskData.taskStatus}</span>
        </div>
      </div>
      <div className="previewTask__actions">
        <button
          className="previewTask__button previewTask__button--cancel"
          onClick={handleClosePopUp}>
          Close
        </button>
      </div>
    </>
  );
};
