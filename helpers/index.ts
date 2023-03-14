export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  
  export const sleep = (time: number | undefined) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  