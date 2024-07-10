import { User } from "../interfaces/page";

// User
export const setCheckUser = () => {
  localStorage.setItem("checkUser", JSON.stringify([]));
};

const getCheckUsers = (): any => {
  const userString = localStorage.getItem("checkUser");
  return userString ? JSON.parse(userString) : null;
};

export const getCheckUser: User = getCheckUsers();

//Admin
export const setCheckAdmin = () => {
  localStorage.setItem("checkAdmin", JSON.stringify([]));
};

const getCheckAdmins = (): any => {
  const userString = localStorage.getItem("checkUser");
  return userString ? JSON.parse(userString) : null;
};

export const getCheckAdmin: User = getCheckAdmins();
