import { apiUrl } from "../config/index";
import RequestHelper from "../helpers/RequestHelper";

export const signInRequest = ({ username, password }) => {
  return RequestHelper.post(`${apiUrl}auth/jwt/create/`, {
    username,
    password,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};