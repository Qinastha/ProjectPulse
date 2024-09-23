import { RequiredInput } from "../interfaces/requireInput";

export const POPUP_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "file",
    name: "projectAvatar",
    className: "project-pop__input",
    required: true,
    label: "label.projectPicture",
  },
  {
    type: "text",
    name: "projectName",
    label: "label.projectName",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "projectDescription",
    label: "label.description",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
  {
    type: "text",
    name: "members",
    label: "label.projectMembers",
    required: true,
    className: "project-pop__input",
    autoComplete: "off",
  },
];
