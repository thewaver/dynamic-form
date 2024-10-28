import { FormField, FormFieldType } from "../../Abstracts/FormField/types";
import { FormInputWrapperProps } from "../FormInputWrapper/types";

export type FormInputProps<T extends FormFieldType> = FormField &
  Omit<FormInputWrapperProps, "name"> & {
    type: T;
    disabled?: boolean;
    onChange: (id: string, value: string) => void;
  };
