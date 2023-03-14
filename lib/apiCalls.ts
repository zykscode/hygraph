import { jwtGet, post } from "./api";


export const getUserDetailsAPI = async (): Promise<[any, any]> => {
  let err = null;
  let data = null;

  try {
    data = await jwtGet("/auth/verifytoken");
  } catch (e:any) {
    if (e.response?.status === 401) {
      err = e?.json;
    }
  }

  return [data, err];
};

export const loginUserAPI = async (body: any): Promise<[any, any]> => {
  let err = null;
  let data = null;

  try {
    data = await post("/auth/login", body);
  } catch (e:any) {
    if (e?.response?.status) {
      err = e?.json;
    }
  }

  return [data, err];
};

export const createUserAPI = async (body: any): Promise<[any, any]> => {
  let err = null;
  let data = null;

  try {
    data = await post("/auth/signup", body);
  } catch (e:any) {
    if (e?.response?.status === 400) {
      err = e?.json;
    }
  }

  return [data, err];
};

