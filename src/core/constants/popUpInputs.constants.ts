import {RequiredInput} from "../interfaces/requireInput";

export const POPUP_REQUIRED_INPUTS: RequiredInput[] = [
    {
        type: "text",
        name: "projectName",
        label: "Project name",
        required: true,
        className: "form-control",
        autoComplete: "off",
    },
    {
        type: "text",
        name: "projectDescription",
        label: "Description",
        required: true,
        className: "form-control",
        autoComplete: "off",
    },
    {
        type: "file",
        name: "projectAvatar",
        className: "form-control",
        required: true,
        label: "Project Picture",
    },
];
