import React from "react";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Shape of the data that the authContext is expected to have.
// If adding more functions/variables to the AuthProvider, then
// IAuthContext is expected to be updated
interface IAuthContext {
  userData: UserState;
  setUserData: (value: UserState) => void;
  registerUser: (value: object) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}

// Also need to give default values for the fields the authcontext is expected to have
// since its strictly typed.
export const AuthContext = createContext<IAuthContext>({
  userData: {
    access: "",
    refresh: "",
    user: {
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
  },
  setUserData: (value: UserState) => {
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

// no props will be passed to the AuthProvider aside from children components
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

// access and refresh refer to tokens
// user_info attribute refers to user credentials
interface UserState {
  access: string;
  refresh: string;
  user: UserCredentials;
}

export function AuthContextProvider({ children }: AuthProvidorProps) {
  const userDataTemplate : UserState = {
    access: "",
    refresh: "",
    user: {
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
  }
  const [userData, setUserData] = useState<UserState>(userDataTemplate);
  
  async function loginUser(username: string, password: string) {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const responseData = await response.json();
      setUserData(responseData);
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
    try {
      await fetch("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.access}`,
        },
        body: JSON.stringify({ refresh: userData.refresh }),
      });
      setUserData(userDataTemplate)
    } catch (error) {
      console.log(error);
    }
  }

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
