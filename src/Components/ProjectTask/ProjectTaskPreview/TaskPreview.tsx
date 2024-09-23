import React from "react";
import { ITaskChecklistItem, IUser, TaskFormData } from "../../../core";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import { useTranslation } from "react-i18next";

interface TaskPreviewProps {
  taskData: TaskFormData;
  handleClosePopUp: () => void;
}

export const TaskPreview: React.FC<TaskPreviewProps> = ({
  taskData,
  handleClosePopUp,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="previewTask__header">{t("taskPreview.preview")}</h2>
      <div className="previewTask__content">
        <div className="previewTask__field">
          <strong>{t("taskPreview.title")}</strong>{" "}
          <span>{taskData.title}</span>
        </div>
        <div className="previewTask__field">
          <strong>{t("taskPreview.description")} </strong>{" "}
          <span>{taskData.description}</span>
        </div>
        <div className="previewTask__field">
          <strong>{t("taskPreview.members")}</strong>
          <ul className="previewTask__list">
            {taskData.members?.map((member: IUser, index) => (
              <li key={index}>
                <div className="previewTask__list--text">
                  {member.firstName} {member.lastName}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="previewTask__field">
          <strong>{t("taskPreview.checkList")}</strong>
          <ul className="previewTask__list">
            {taskData.checkList?.map(
              (item: ITaskChecklistItem, index: number) => (
                <li key={index} className="checklist-item">
                  <div className="previewTask__list--text">
                    {item.text}{" "}
                    {item.isCompleted ? (
                      <DoneOutlineOutlinedIcon />
                    ) : (
                      <HourglassBottomOutlinedIcon />
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="previewTask__field">
          <strong>
            {t("taskPreview.deadline")} {""}
          </strong>
          <span>
            {taskData.deadLine
              ? new Date(taskData.deadLine).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="previewTask__field">
          <strong>{t("taskPreview.department")}</strong>{" "}
          <span>{taskData.taskDepartment}</span>
        </div>
        <div className="previewTask__field">
          <strong>{t("taskPreview.status")}</strong>{" "}
          <span>{taskData.taskStatus}</span>
        </div>
      </div>
      <div className="previewTask__actions">
        <button
          className="previewTask__button previewTask__button--cancel"
          onClick={handleClosePopUp}>
          {t("button.close")}
        </button>
      </div>
    </>
  );
};
