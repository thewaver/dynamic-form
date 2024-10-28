// could use React.HTMLInputTypeAttribute,
// but for the sake of keeping the API agnostic,
// we'll use our internal types
type PrunedFieldType = string;

type PrunedFormField<T extends PrunedFieldType, O extends object> = O & {
  id: string;
  type: T;
  required?: boolean;
  placeholder?: string;
};

export type ChoiceFieldItem = {
  id: string;
  value: string;
};

export type SingleChoiceField = PrunedFormField<
  "single-choice",
  {
    choices: ChoiceFieldItem[];
  }
>;

export type MultiChoiceField = PrunedFormField<
  "multi-choice",
  {
    choices: ChoiceFieldItem[];
    choiceLimit?: number;
  }
>;

export type TextField = PrunedFormField<"text", {}>;

export type DateFieldString = `${number}-${number}-${number}` | "";

export type DateField = PrunedFormField<
  "date",
  { min?: DateFieldString; max?: DateFieldString }
>;

export type FormField =
  | SingleChoiceField
  | MultiChoiceField
  | DateField
  | TextField;

export type FormFieldType = FormField["type"];
