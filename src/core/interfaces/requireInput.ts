export interface RequiredInput {
  type: string;
  name: string;
  className: string;
  required: boolean;
  label: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  options?: Array<{ name: string; value: string; flag?: string }>;
}
