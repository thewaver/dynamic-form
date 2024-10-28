import { FormConfig } from "../../Abstracts/FormConfig/types";
import { Person } from "../../Abstracts/Person/types";

export const PERSON_CONFIG: FormConfig<keyof Person> = {
  // primary
  firstName: {
    type: "text",
    id: "firstName",
    placeholder: "Whosit",
    required: true,
  },
  lastName: {
    type: "text",
    id: "lastName",
    placeholder: "MacWhocares",
    required: true,
  },
  // secondary
  address: {
    type: "text",
    id: "address",
    placeholder: "Imagination Land 42c",
    required: true,
  },
  birthdate: {
    type: "date",
    id: "birthdate",
    max: "2006-01-01",
    required: true,
  },
  gender: {
    type: "single-choice",
    id: "gender",
    placeholder: "PICK_ONE_GENDER",
    required: true,
    choices: [
      {
        id: "male",
        value: "male",
      },
      {
        id: "female",
        value: "female",
      },
      {
        id: "helicopter",
        value: "helicopter",
      },
    ],
  },
};
