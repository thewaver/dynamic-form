import { FormField } from "../FormField/types";

export type FormConfig<T extends string = string> = Record<T, FormField>;
