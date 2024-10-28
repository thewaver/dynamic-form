import PERSON_API from "../Person";
import { DynamicFormKey } from "./types";

export class DynamicFormApi {
  static getConfig = (key: DynamicFormKey) => {
    switch (key) {
      case "person": {
        return PERSON_API.getFormConfig();
      }

      default: {
        return null;
      }
    }
  };

  static validateField = <T extends string>(
    key: DynamicFormKey,
    fieldId: T,
    fieldValue: string
  ) => {
    switch (key) {
      case "person": {
        return PERSON_API.validateField(fieldId as any, fieldValue);
      }

      default: {
        return null;
      }
    }
  };

  static validateAll = <T extends string>(
    key: DynamicFormKey,
    data: Record<T, string>
  ) => {
    switch (key) {
      case "person": {
        return PERSON_API.validatePerson(data as any);
      }

      default: {
        return null;
      }
    }
  };

  static submit = <T extends string>(
    key: DynamicFormKey,
    data: Record<T, string>
  ) => {
    switch (key) {
      case "person": {
        return PERSON_API.updatePerson(data as any);
      }

      default: {
        return null;
      }
    }
  };
}
