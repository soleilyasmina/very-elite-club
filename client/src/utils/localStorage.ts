import { fromNow } from "./time";

export const getLocalStorage = () => {
  return {
    name: window.localStorage.getItem("currentName"),
    code: window.localStorage.getItem("currentCode"),
    ttl: window.localStorage.getItem("currentTTL"),
  };
};

export const setLocalStorage = (name: string, code: string) => {
  window.localStorage.setItem("currentName", name);
  window.localStorage.setItem("currentCode", code);
  window.localStorage.setItem("currentTTL", fromNow(0, 6).toString());
};
