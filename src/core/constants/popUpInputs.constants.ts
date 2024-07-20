import { RequiredInput } from "../interfaces/requireInput";

export const POPUP_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "projectName",
    label: "Project name",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "projectDescription",
    label: "Description",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
  {
    type: "file",
    name: "projectAvatar",
    className: "project-pop__input",
    required: true,
    label: "Project Picture",
  },
  {
    type: "text",
    name: "members",
    label: "Select Members",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
];
