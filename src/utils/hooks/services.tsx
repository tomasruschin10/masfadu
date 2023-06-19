import { store } from "../../redux/store";
import { baseApi } from "../api";
import * as FileSystem from 'expo-file-system';
import { Offer } from "../typos/offer.interface";

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


export const postTags = (url, body) => {
  const state: any = store.getState();
  const authToken = state.token;
  let tags
  new Promise((resolve, reject) => {
    baseApi
      .post(`/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        tags = res
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return tags
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


export const publishOffer = async ({ title, description, offer_category_id, image, partner_id }: Offer) => {

  const state: any = store.getState();
  const authToken = state.token;

  const { userdata: { career_id } } = state.user;

  const parameters: any = {
    title,
    description,
    offer_category_id,
    career_id,
    image
  }
   
  if(partner_id){
    parameters.partner_id = partner_id;
  }

  const uploadUrl = baseApi.defaults.baseURL + '/offer/create';
  const options: FileSystem.FileSystemUploadOptions = {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'image',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    parameters,
  };




  return await FileSystem.uploadAsync(uploadUrl, image.uri, options);

};
