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
  user: object;
  setUser: (value: UserState) => void;
  registerUser: (value: object) => void;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
}

// Also need to give default values for the fields the authcontext is expected to have
// since its strictly typed.
export const AuthContext = createContext<IAuthContext>({
  user: {},
  setUser: (value: UserState) => {
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

// access and refresh refer to tokens
// user attribute refers to user credentials (yes, it is accessed via user.user -_-)
interface UserState {
  access: string;
  refresh: string;
  user: object;
}

export function AuthContextProvider({ children }: AuthProvidorProps) {
  const [user, setUser] = useState<UserState>({
    access: "",
    refresh: "",
    user: {},
  });

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
      setUser(responseData);
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
          "Authorization": `Bearer ${user.access}`,
        },
        body: JSON.stringify({refresh:user.refresh}),
      });

    } catch (error) {
      console.log(error)
    }
  }

  const authValues = {
    user,
    setUser,
    loginUser,
    registerUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}
