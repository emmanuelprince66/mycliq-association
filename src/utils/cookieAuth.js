import Cookies from "js-cookie";

export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

export const setCookie = (cookieName) => {
  return Cookies.set(cookieName);
};
