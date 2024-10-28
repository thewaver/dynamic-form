import { FormField } from "../FormField/types";

export type Person = {
  firstName: string;
  lastName: string;
  birthdate: string;
  address: string;
  gender: string;
};

export type PersonFormConfig = Record<keyof Person, FormField>;
