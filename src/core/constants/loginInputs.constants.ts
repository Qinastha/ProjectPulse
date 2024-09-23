import { RequiredInput } from "../interfaces/requireInput";

export const LOGIN_REQUIRED_INPUTS: RequiredInput[] = [
  {
    type: "text",
    name: "email",
    className: "form-control",
    required: true,
    label: "label.email",
  },
  {
    type: "password",
    name: "password",
    className: "form-control",
    required: true,
    label: "label.password",
  },
];
