export const setCheckUser = () => {
  localStorage.setItem("checkUser", JSON.stringify([]));
};

export const getCheckUser: any = () => {
  localStorage.getItem("checkUser");
};
