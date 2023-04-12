import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

const LOCAL_STORAGE_AUTH_KEY = "donut_pcs_local_storage_tokens_key";

// Shape of the data that the authContext is expected to have.
// If adding more functions/variables to the AuthProvider, then
// IAuthContext is expected to be updated
interface IAuthContext {
  userData: UserCredentials;
  setUserData: (value: UserCredentials) => void;
  registerUser: (value: object) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}

// Also need to give default values for the fields the authcontext is expected to have
// since its strictly typed.
export const AuthContext = createContext<IAuthContext>({
  userData: {
    id: null,
    username: "",
    email: "",
    is_active: false,
    first_name: "",
    last_name: "",
    date_created: "",
    is_customer: false,
    is_employee: false,
    is_superuser: false,
    blacklisted: false,
    balance: null,
    memo: "",
  },
  setUserData: (value: UserCredentials) => {
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

interface UserCredentials {
  id: number | null;
  username: string;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  date_created: string;
  is_customer: boolean;
  is_employee: boolean;
  is_superuser: boolean;
  blacklisted: boolean;
  balance: number | null;
  memo: "";
}
interface UserTokens {
  access: string;
  refresh: string;
}

export function AuthContextProvider({ children }: AuthProvidorProps) {
  const userDataTemplate: UserCredentials = {
    id: null,
    username: "",
    email: "",
    is_active: false,
    first_name: "",
    last_name: "",
    date_created: "",
    is_customer: false,
    is_employee: false,
    is_superuser: false,
    blacklisted: false,
    balance: null,
    memo: "",
  };

  const userTokensTemplate: UserTokens = {
    refresh: "",
    access: "",
  };

  const [userTokens, setUserTokens] = useState<UserTokens>(userTokensTemplate);
  const [userData, setUserData] = useState<UserCredentials>(userDataTemplate);

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
      // put tokens in local storage to use for login persistance
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(tokensData));
      // now use the tokens to log the user in
      setUserTokens(tokensData);

      // finally, login the user using the tokens
      loginWithTokens(tokensData.access, tokensData.refresh);
    } catch (error) {
      console.log(error);
    }
  }
  async function registerUser(registerForm: object) {
    try {
      const response = await fetch("/auth/register", {
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

    const refreshToken : string = userTokens.refresh
    const accessToken : string = userTokens.access
    try {
      await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      setUserData(userDataTemplate);
      setUserTokens(userTokensTemplate)
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
    } catch (error) {
      console.log(error);
    }
  }

  async function loginWithTokens(access: string, refresh: string) {
    try {
      const response = await fetch("auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${access}`,
        },
      });
      const responseData: UserCredentials = await response.json();
      setUserData(responseData);
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
      loginWithTokens(tokens.access, tokens.refresh);
    }
  }, []);

  const authValues = {
    userData,
    setUserData,
    loginUser,
    registerUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}
