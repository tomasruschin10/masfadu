import { store } from "../../redux/store";
import { baseApi } from "../api";
import * as FileSystem from "expo-file-system";
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

export const getCategories = async () => {
  const state: any = store.getState();
  const authToken = state.token;

  const headers = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return new Promise((resolve) => {
    resolve(baseApi.get("/offer-category/all", headers));
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
  let tags;
  new Promise((resolve, reject) => {
    baseApi
      .post(`/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        tags = res;
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return tags;
};

export const putServices = (url, body?, ContentType?) => {
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

export const publishOffer = async ({
  name,
  email,
  phone,
  title,
  description,
  offer_category_id,
  image,
  partner_id,
  url,
}: Offer) => {
  const state: any = store.getState();
  const authToken = state.token;

  const {
    userdata: { career_id, id },
  } = state.user;

  const parameters: any = {
    title,
    description,
    career_id,
    offer_category_id,
    name,
    phone,
    email,
    userId: id,
    image,
  };

  if (url) {
    parameters.url = url;
  }

  if (!partner_id) {
    try {
      const response = await fetch(
        baseApi.defaults.baseURL + "/partner/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "partner" }),
        }
      );

      const responseData = await response.json();
      parameters.partner_id = responseData.id;
    } catch (error) {
      console.error("Error al crear el partner:", error);
    }
  }

  const uploadUrl = baseApi.defaults.baseURL + "/offer/create";
  const options: FileSystem.FileSystemUploadOptions = {
    httpMethod: "POST",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: "image",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    parameters,
  };

  console.log("PARAMETERS <>", parameters);

  return await FileSystem.uploadAsync(uploadUrl, image.uri, options);
};

export const updateOffer = async ({
  name,
  email,
  phone,
  title,
  description,
  offer_category_id,
  image,
  partner_id,
  url,
  id,
}: Offer) => {
  const state: any = store.getState();
  const authToken = state.token;

  const {
    userdata: { career_id },
  } = state.user;

  const parameters: any = {
    title,
    description,
    career_id,
    offer_category_id,
    name,
    phone,
    email,
    partner_id,
    url,
    image,
  };

  const uploadUrl = baseApi.defaults.baseURL + `/offer/update/${id}`;
  const options: FileSystem.FileSystemUploadOptions = {
    httpMethod: "PUT",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: "image",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    parameters,
  };

  console.log("PARAMETERS <>", parameters);

  if (image && image.uri) {
    return await FileSystem.uploadAsync(uploadUrl, image.uri, options);
  } else {
    return await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    });
  }
};

export const publishDoc = async ({
  resource_category_id,
  image,
  name,
  subject_id,
}: {
  resource_category_id: string;
  image: any;
  name: string;
  subject_id: string;
}) => {
  const state: any = store.getState();
  const authToken = state.token;
  const {
    userdata: { id: user_id },
  } = state.user;

  const parameters: any = {
    resource_category_id,
    image,
    name,
    subject_id,
    user_id,
  };

  const uploadUrl = baseApi.defaults.baseURL + "/resource/create";
  const options: FileSystem.FileSystemUploadOptions = {
    httpMethod: "POST",
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: "image",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    parameters,
  };

  return await FileSystem.uploadAsync(uploadUrl, image.uri, options);
};
