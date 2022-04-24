/* eslint-disable import/prefer-default-export */
export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
};

export const saveToken = (userToken) => {
  localStorage.setItem("token", JSON.stringify(userToken));
};
