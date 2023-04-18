import "../scss/approve.scss";

import { useEffect, useState } from "react";
import {
  UserCredentials,
  useAuthContext,
  userDataTemplate,
} from "src/contexts/AuthContext";
import apiClient from "src/services/apiClient";
import { UserRow } from "./UserRow";
export default function Approve() {
  const [allUsers, setAllUsers] = useState<[UserCredentials]>([
    userDataTemplate,
  ]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<string>("");
  const authValues = useAuthContext();
  const user = authValues.userData;

  function getUserType(user: UserCredentials): string {
    if (user.is_superuser) return "superuser";
    else if (user.is_employee) return "employee";
    else return "customer";
  }

  async function getCustomers() {
    const response = await fetch("/");
  }

  useEffect(() => {
    async function getAllUsers() {
      const { data, error } = await apiClient.getUsers();
      if (data) setAllUsers(data.users);
      else console.log(error);
    }

    setUserType(getUserType(user));
    getAllUsers();
    setisLoading(false);
  }, []);

  console.log(allUsers);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className="component">
      <h1 className="component__header">
        <div className="logo__accent-left">{`<`}</div> Account Requests{" "}
        <div className="logo__accent-right">{`>`}</div>
      </h1>
      <div className="component__content">
        {allUsers.map((individualUser: UserCredentials, index: number) => {
          return (
            <UserRow
              username={individualUser.username}
              email={individualUser.email}
              userType={getUserType(individualUser)}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
}