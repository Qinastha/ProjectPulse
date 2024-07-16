export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: string;
  position: "project manager" | "developer" | "designer" | "tester" | "";
}
