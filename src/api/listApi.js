import { apiUrl } from "../config/index";
import RequestHelper from "../helpers/RequestHelper";

export const getListCheckInRequest = (body) => {
  return RequestHelper.get(`${apiUrl}logs/?${body.search ? `search=${body.search}`: ""}${body.page ?`&page=${body.page}`: ""}${body.date__iexact ?`&date__iexact=${body.date__iexact}`: ""}`)
    .then((res) => {
      return res.data;  
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const getDetailCheckInRequest = (CCCD) => {
  return RequestHelper.get(`${apiUrl}students/${CCCD}/logs`)
  .then ((res) => {
    return res.data;
  })
  .catch((error) => {
    throw new Error(error);
  });
};

export const getDetailStudentRequest = (CCCD) => {
  return RequestHelper.get(`${apiUrl}students/${CCCD}`)
  .then ((res) => {
    return res.data;
  })
  .catch((error) => {
    throw new Error(error);
  });
}

export const findDetailRequest = (CCCD) => {
  return RequestHelper.getNoToken(`${apiUrl}logs/?student=${CCCD}`)
  .then ((res) => {
    return res.data;
  })
  .catch((error) => {
    throw new Error(error);
  });
}