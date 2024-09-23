import { RequiredInput } from "../interfaces/requireInput";

export const REGISTER_REQUIRED_INPUTS: RequiredInput[] = [
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
  {
    type: "text",
    name: "firstName",
    className: "form-control",
    required: true,
    label: "label.firstName",
  },
  {
    type: "text",
    name: "lastName",
    className: "form-control",
    required: true,
    label: "label.lastName",
  },
  {
    type: "text",
    name: "userName",
    className: "form-control",
    required: true,
    label: "label.userName",
  },
  {
    type: "date",
    name: "dateOfBirth",
    className: "form-control",
    required: true,
    label: "label.dob",
  },
  {
    type: "select",
    name: "position",
    className: "form-control",
    required: true,
    label: "label.position",
    options: [
      { value: "project manager", name: "Project Manager" },
      { value: "developer", name: "Developer" },
      { value: "designer", name: "Designer" },
      { value: "tester", name: "Tester" },
    ],
  },
];
