import { store } from "../../redux/store";
import { baseApi } from "../api";

export const getServices = (url) => {
  const state: any = store.getState();
  const authToken = state.token;

  const headers = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return new Promise((resolve) => {
    resolve(baseApi.get(`/${url}`, headers));
  });
};

export const postServices = (url, body, ContentType?) => {
  const state: any = store.getState();
  const authToken = state.token;
  return new Promise((resolve, reject) => {
    baseApi
      .post(`/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const putServices = (url, body, ContentType?) => {
  const state: any = store.getState();
  const authToken = state.token;

  return baseApi.put(`/${url}`, body, {
    headers: {
      "Content-Type": ContentType || "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const deleteServices = (url) => {
  const state: any = store.getState();
  const authToken = state.token;

  return baseApi.delete(`/${url}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};
