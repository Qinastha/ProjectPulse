import {RequiredInput} from "../interfaces/requireInput";

export const REGISTER_REQUIRED_INPUTS: RequiredInput[] = [
    {
        type: "text",
        name: "email",
        className: "form-control",
        required: true,
        label: "Email",
    },
    {
        type: "password",
        name: "password",
        className: "form-control",
        required: true,
        label: "Password",
    },
    {
        type: "text",
        name: "firstName",
        className: "form-control",
        required: true,
        label: "First Name",
    },
    {
        type: "text",
        name: "lastName",
        className: "form-control",
        required: true,
        label: "Last Name",
    },
    {
        type: "text",
        name: "userName",
        className: "form-control",
        required: true,
        label: "Username",
    },
    {
        type: "date",
        name: "dateOfBirth",
        className: "form-control",
        required: true,
        label: "Date of Birth",
    },
    {
        type: "select",
        name: "position",
        className: "form-control",
        required: true,
        label: "Position",
        options: [
            {value: "project manager", name: "Project Manager"},
            {value: "developer", name: "Developer"},
            {value: "designer", name: "Designer"},
            {value: "tester", name: "Tester"},
        ],
    },
];
