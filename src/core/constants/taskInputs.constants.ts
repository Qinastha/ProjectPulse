import { RequiredInput } from "../interfaces/requireInput";

export const TASK_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "taskName",
    label: "Task name",
    required: true,
    className: "form-control",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "taskDescription",
    label: "Task description",
    required: true,
    className: "form-control",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "taskPriority",
    label: "Task priority",
    required: true,
    className: "form-control",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "taskStatus",
    label: "Task status",
    required: true,
    className: "form-control",
    autoComplete: "off",
  },
];
