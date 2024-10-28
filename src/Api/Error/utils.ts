import {
  ERROR_CONTEXT_SPLIT_CHAR,
  ERROR_JOIN_CHAR,
  GLOBAL_ERROR_KEY,
} from "./const";

export const mapApiErrors = (errorString: string): Record<string, string> => {
  return errorString.split(ERROR_JOIN_CHAR).reduce((res, cur, idx) => {
    const parts = cur.split(ERROR_CONTEXT_SPLIT_CHAR);

    if (parts.length === 2) {
      res[parts[0]] = parts[1];
    } else if (parts.length === 1) {
      res[`${GLOBAL_ERROR_KEY}_${idx}`] = parts[0];
    }

    return res;
  }, {} as Record<string, string>);
};
