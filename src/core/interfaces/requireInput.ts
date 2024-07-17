export interface RequiredInput {
  type: string;
  name: string;
  className: string;
  required: boolean;
  label: string;
  autoComplete?: string;
  options?: Array<{ name: string; value: string; flag?: string }>;
}
