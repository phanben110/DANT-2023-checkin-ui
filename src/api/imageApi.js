import axios from "axios";
import {imgUrl}  from "../config/apiUrl";

export const postImageRequest = async (fileName, image) => {
  var result = await axios
    .post(
      `${imgUrl}`,
      image,
      {
        headers: {
          accept: "*/*",
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
  return result;
};
