import React, { createContext, useState, useEffect } from "react";

import { getToken, removeToken, setToken } from "#/helpers/index";
import useToast from "#/helpers/notify";

import { loginUserAPI, createUserAPI, getUserDetailsAPI } from "#/lib/apiCalls";
import { User } from "#/lib/types";
import { useRouter } from "next/navigation";


interface AuthContextProps {
  router: any;
  userInfo: User;
  loading: boolean;
  isAuthenticated: boolean | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  VerifyUser: () => Promise<void>;
  LoginToAccount: (body: any) => Promise<void>;
  CreateAccount: (body: any) => Promise<void>;
  LogoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthState: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { success, error } = useToast()

  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      LogoutUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    VerifyUser();
    setLoading(false);
  }, []);

  const LoginToAccount = async (body: any): Promise<void> => {
    const [data, err] = await loginUserAPI(body);
    if (data?.success === true) {
      console.log("Succesfully Login");
      setIsAuthenticated(true);
      setUserInfo(data?.data);
      setToken(data?.token);
      success("Succesfully Login");
      router.push("/");
    } else if (err) {
      console.log(err?.message);
      error(err?.message);
    }
  };

  const CreateAccount = async (body: any): Promise<void> => {
    const [data, err] = await createUserAPI(body);
    if (data?.success === true) {
      console.log("Account Created Succesfully!");
      router.push("/login");
      success("Account Created Succesfully!");
    } else if (err) {
      console.log(err?.message);
      error(err?.message);
    }
  };

  const VerifyUser = async (): Promise<void> => {
    if (!getToken()) {
      setIsAuthenticated(false);
      return;
    }
    const [data, err] = await getUserDetailsAPI();
    if (data?.success === true) {
      setIsAuthenticated(true);
      console.log(data.data);
      setUserInfo(data?.data);
    } else if (err) {
      console.log(err?.message);
      error(err?.message);
      LogoutUser();
    }
  };

  const LogoutUser = (): void => {
    setIsAuthenticated(false);
    setUserInfo({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      username: "",
    });
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        router,
        userInfo,
        loading,
        setLoading,
        isAuthenticated,
        setUserInfo,
        VerifyUser,
        LoginToAccount,
        CreateAccount,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
export { AuthContext };
