import "../scss/user-row.scss";
import Button from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import apiClient from "src/services/apiClient";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
interface UserRowProps {
  username: string;
  userId: number;
  email: string;
  userType: string;
  firstName: string;
  lastName: string;
  getAllUsers: Function;
}

export interface IApprovalForm {
  is_active: boolean;
  memo: string;
}

export function UserRow({
  username,
  userId,
  email,
  userType,
  firstName,
  lastName,
  getAllUsers,
}: UserRowProps) {
  const authVariables = useAuthContext();
  const accessToken = authVariables.userTokens.access;

  // initialize approval form state in order to fill out when rejecting user
  const [rejectionMemo, setRejectionMemo] = useState<string>("");

  async function handleApproveButton() {
    let approvalForm: IApprovalForm = {
      is_active: true,
      memo: "No Issues With User",
    };
    try {
      console.log(approvalForm);
      await fetch(`/users/activate/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(approvalForm),
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRejectButton() {
    let approvalForm: IApprovalForm = {
      is_active: true,
      memo: "REJECTION MEMO",
    };
    try {
      console.log(approvalForm);
      await fetch(`/users/activate/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(approvalForm),
      });
      await fetch(`/users/blacklist/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ blacklisted: true }),
      });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user-row">
      <div className="user-row__info">
        <h2 className="user-row__user-type">{userType}</h2>
        <p>
          {firstName} {lastName}
        </p>
        <p>{email}</p>
      </div>
      <div className="user-row__buttons">
        <Button
          className="user-row__buttons__approve"
          onClick={handleApproveButton}
        >
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </Button>
        <Button
          className="user-row__buttons__reject"
          onClick={handleRejectButton}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </Button>
      </div>
    </div>
  );
}
