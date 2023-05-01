import "../scss/approve.scss";

import { useEffect, useState } from "react";
import { UserCredentials, useAuthContext } from "src/contexts/AuthContext";
import apiClient from "src/services/apiClient";
import { UserRow } from "./UserRow";

export default function Approve() {
  const authValues = useAuthContext();
  const user = authValues.userData;
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers();
    setisLoading(false);
  }, []);

  async function getAllUsers() {
    // request parameters for endpoint depends on the userType of the user currenlty logged in
    let usersParam: string = user.user_type === "Owner" ? "" : "customer";
    let inActiveUsers;
    const { data, error } = await apiClient.getUsers(usersParam);

    // If the user currently logged in is super_user then response object is called users
    if (data.users) {
      inActiveUsers = data.users.filter((individualUser: UserCredentials) => {
        return !individualUser.is_active;
      });
    }
    // If the user currently logged in is super_user then response object is called customers
    else if (data.customers) {
      inActiveUsers = data.customers.filter(
        (individualUser: UserCredentials) => {
          return !individualUser.is_active;
        }
      );
    } else console.log(error);

    setAllUsers(inActiveUsers);
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className="component">
      <h1 className="component__header">
        <div className="logo__accent-left">{`<`}</div> Account Registration
        Requests <div className="logo__accent-right">{`>`}</div>
      </h1>
      {allUsers.length == 0 ? (
        <div className="component__content">
          <h2 className="component__header">No Pending Requests </h2>
        </div>
      ) : (
        <div className="component__content">
          {allUsers.map((individualUser: UserCredentials, index: number) => {
            return (
              <UserRow
                username={individualUser.username}
                userId={individualUser.id}
                email={individualUser.email}
                userType={individualUser.user_type}
                key={index}
                firstName={individualUser.first_name}
                lastName={individualUser.last_name}
                getAllUsers={getAllUsers}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
