import axios from "axios";
import apiClient from "src/services/apiClient";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { IBalanceForm } from "src/pages/AccountDetails";

const LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";

// Shape of the data that the authContext is expected to have.
// If adding more functions/variables to the AuthProvider, then
// IAuthContext is expected to be updated
interface IAuthContext {
  userData: IUserCredentials;
  userTokens: UserTokens;
  setUserData: (value: IUserCredentials) => void;
  registerUser: (value: object) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  askForBalance: (value: IBalanceForm) => void;
}

// Also need to give default values for the fields the authcontext is expected to have
// since its strictly typed.
export const AuthContext = createContext<IAuthContext>({
  userData: {
    id: -1,
    username: "",
    email: "",
    is_active: false,
    first_name: "",
    last_name: "",
    date_created: "",
    user_type: "Visitor",
    blacklisted: false,
    balance: null,
    memo: "",
  },
  userTokens: {
    refresh: "",
    access: "",
  },
  setUserData: (value: IUserCredentials) => {
    /* do nothing */
  },
  registerUser: (value) => {
    /* do nothing */
  },
  loginUser: (username, password) => {
    /* do nothing */
  },
  logoutUser: () => {
    /* do nothing */
  },
  askForBalance: () => {
    /* do nothing */
  },
});

// using custom react hook in order to use the context
// because we can't call useContext on Auth (from any other components)
// if it only exists here
export function useAuthContext() {
  return useContext(AuthContext);
}

// no props will be passed to the AuthProvider aside from react children components
interface AuthProvidorProps {
  children?: ReactNode;
}

// T stands for "type". This defined type will be used for components such as navbar and approve
export type TUserType = "Owner" | "Employee" | "Customer" | "Visitor";

export interface IUserCredentials {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  date_created: string;
  user_type: TUserType;
  blacklisted: boolean;
  balance: number | null;
  memo: "";
  warnings?:number;
  compliments?:number;
}
// to keep typescript happy
export const userDataTemplate: IUserCredentials = {
  id: -1,
  username: "",
  email: "",
  is_active: false,
  first_name: "",
  last_name: "",
  date_created: "",
  user_type: "Visitor",
  blacklisted: false,
  balance: null,
  memo: "",
};
export interface UserTokens {
  access: string;
  refresh: string;
}
// to keep typescript happy
export const userTokensTemplate: UserTokens = {
  refresh: "null",
  access: "null",
};

export function AuthContextProvider({ children }: AuthProvidorProps) {
  const [userTokens, setUserTokens] = useState<UserTokens>(userTokensTemplate);
  const [userData, setUserData] = useState<IUserCredentials>(userDataTemplate);

  async function loginUser(username: string, password: string) {
    try {
      const tokensResponse = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const tokensData: UserTokens = await tokensResponse.json();
      // set tokens state to contain the response data
      setUserTokens({ ...tokensData });
      /* put tokens in local storage to use for login persistance. 
      (the following two lines do the same thing, will delete one of them later) */
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokensData));
      apiClient.setTokens(tokensData);

      // finally, login the user using the tokens
      loginWithToken(tokensData.access);
    } catch (error) {
      console.log(error);
    }
  }

  async function registerUser(registerForm: object) {
    try {
      await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    const refreshToken: string = userTokens.refresh;
    const accessToken: string = userTokens.access;
    try {
      await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      setUserData(userDataTemplate);
      setUserTokens(userTokensTemplate);
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      // reset user tokens private variables in apiClient
      apiClient.setTokens(userTokensTemplate)
    } catch (error) {
      console.log(error);
    }
  }

  async function loginWithToken(access: string) {
    try {
      const headers: any = {
        "Content-Type": "application/json",
      };
      headers["Authorization"] = `Bearer ${access}`;
      const response = await axios({
        url: "auth/me",
        method: "GET",
        data: {},
        headers: headers,
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function askForBalance(balanceForm: IBalanceForm) {
    const accessToken: string = userTokens.access;
    try {
      await fetch("users/balance", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(balanceForm),
      });
      loginWithToken(accessToken)
    } catch (error) {
      console.log(error);
    }
  }

  /* automatically login user upon refresh if refresh and access tokens
    are available in local storage */
  useEffect(() => {
    function isString(value: any): value is string {
      return typeof value === "string";
    }

    const tokenString = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (isString(tokenString)) {
      const tokens = JSON.parse(tokenString);
      setUserTokens(tokens);
      apiClient.setTokens(tokens);
      loginWithToken(tokens.access);
    }
  }, []);

  const authValues = {
    userData,
    userTokens,
    setUserData,
    loginUser,
    registerUser,
    logoutUser,
    askForBalance
  };
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}
