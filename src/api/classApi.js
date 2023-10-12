import { apiUrl } from "../config/index";
import RequestHelper from "../helpers/RequestHelper";

export const getListStudentRequest = (body) => {
  return RequestHelper.get(`${apiUrl}classSH/1/students/?${body.search ? `search=${body.search}`: ""}${body.page ?`&page=${body.page}`: ""}}`)
    .then((res) => {
      return res.data;  
    })
    .catch((error) => {
      throw new Error(error);
    });
}; 

export const updateStudentInforRequest = (CCCD, body) => {
  return RequestHelper.patch(`${apiUrl}classSH/1/students/${CCCD}/`, body)
  .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
}

export const createNewStudentRequest = (body) => {
  return RequestHelper.post(`${apiUrl}classSH/1/students/`, body)
  .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
}

export const deleteStudentRequest = (CCCD) => {
  return RequestHelper.delete(`${apiUrl}classSH/1/students/${CCCD}`)
  .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });
}