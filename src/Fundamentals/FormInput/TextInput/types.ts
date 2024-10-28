import { FormInputProps } from "../types";

export type TextInputProps = FormInputProps<"text"> & {
  onBlur: (id: string, value: string) => void;
  onFocus: (id: string) => void;
};
