export enum ApiErrorKey {
  ERR_PERSON_NOT_EXISTS = "ERR_PERSON_NOT_EXISTS",
  ERR_NO_PERSON_WITH_FIRST_NAME = "ERR_NO_PERSON_WITH_FIRST_NAME",
  ERR_NO_PERSON_WITH_LAST_NAME = "ERR_NO_PERSON_WITH_LAST_NAME",
}

export type ApiFieldError<T extends string = string> = `${T}:${ApiErrorKey}`;
