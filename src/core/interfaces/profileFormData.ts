export interface ProfileFormData {
  avatar?: File | string;
  phoneNumber: string;
  gender: string;
  address: {
    street: string;
    street2: string;
    city: string;
    country: string;
    zipCode: string;
  };
  language: string;
  timeZone: string;
}
