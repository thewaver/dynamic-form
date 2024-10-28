import { API_MOCK_DELAY } from "./const";

export const mockApiCall = <T extends Function>(fn: T) => {
  setTimeout(fn, API_MOCK_DELAY);
};
