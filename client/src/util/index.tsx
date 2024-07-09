import { User } from "../interfaces/page";

export const setCheckUser = () => {
  localStorage.setItem("checkUser", JSON.stringify([]));
};

const getCheckUsers = (): any => {
  const userString = localStorage.getItem("checkUser");
  return userString ? JSON.parse(userString) : null;
};

export const getCheckUser: User = getCheckUsers();
