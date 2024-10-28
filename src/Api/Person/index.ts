import { Person } from "../../Abstracts/Person/types";
import { ERROR_JOIN_CHAR, GLOBAL_ERROR_KEY } from "../Error/const";
import { ApiErrorKey, ApiFieldError } from "../Error/types";
import { mockApiCall } from "../utils";
import { PERSON_CONFIG } from "./const";

class PersonAPI {
  private readonly data: Partial<Person>[] = [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
    },
  ];

  getFormConfig = () => {
    return new Promise<typeof PERSON_CONFIG>((resolve, reject) => {
      mockApiCall(() => {
        resolve(PERSON_CONFIG);
      });
    });
  };

  getPeople = () => {
    return new Promise<typeof this.data>((resolve, reject) => {
      mockApiCall(() => {
        resolve(this.data);
      });
    });
  };

  hasPerson = (data: Pick<Person, "firstName" | "lastName">) => {
    return new Promise<boolean>((resolve, reject) => {
      mockApiCall(() => {
        resolve(
          !!this.data.find(
            (person) =>
              person.firstName === data.firstName &&
              person.lastName === data.lastName
          )
        );
      });
    });
  };

  validateField = <T>(fieldId: keyof Person, fieldValue: T) => {
    return new Promise<void>((resolve, reject) => {
      mockApiCall(() => {
        switch (fieldId) {
          case "address": {
            break;
          }

          case "birthdate": {
            break;
          }

          case "gender": {
            break;
          }

          case "firstName": {
            if (!this.data.find((person) => person.firstName === fieldValue)) {
              reject(`${fieldId}:${ApiErrorKey.ERR_NO_PERSON_WITH_FIRST_NAME}`);

              return;
            }

            break;
          }

          case "lastName": {
            if (!this.data.find((person) => person.lastName === fieldValue)) {
              reject(`${fieldId}:${ApiErrorKey.ERR_NO_PERSON_WITH_LAST_NAME}`);

              return;
            }

            break;
          }
        }

        resolve();
      });
    });
  };

  validatePerson = (data: Person) => {
    return Promise.all(
      Object.entries(data).map(([key, value]) =>
        this.validateField(key as keyof Person, value)
      )
    );
  };

  updatePerson = (data: Person, upsert?: boolean) => {
    return new Promise<void>((resolve, reject) => {
      mockApiCall(() => {
        const existingIdx = this.data.findIndex(
          (person) =>
            person.firstName === data.firstName &&
            person.lastName === data.lastName
        );

        if (existingIdx === -1 && !upsert) {
          reject(
            new Error(
              `${GLOBAL_ERROR_KEY}:${ApiErrorKey.ERR_PERSON_NOT_EXISTS}`
            )
          );

          return;
        }

        try {
          this.validatePerson(data).then(() => {
            if (existingIdx === -1) {
              this.data.push(data);
            } else {
              this.data[existingIdx] = {
                ...this.data[existingIdx],
                ...data,
              };
            }

            resolve();
          });
        } catch (e) {
          reject(new Error((e as ApiFieldError[]).join(ERROR_JOIN_CHAR)));
        }
      });
    });
  };
}

const PERSON_API = new PersonAPI();

export default PERSON_API;
