import "../scss/user-row.scss";
import Button from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import MemoModal from "src/components/MemoModal";

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
  const [memoModalOpen, setMemoModalOpen] = useState(false);

  async function handleApproveButton() {
    let approvalForm: IApprovalForm = {
      is_active: true,
      memo: "No Issues With User",
    };
    try {
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

  function openMemoModal() {
    setMemoModalOpen(true);
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
          className="user-row__buttons__approve blue-primary"
          onClick={handleApproveButton}
        >
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </Button>
        <Button className="user-row__buttons__reject black-primary" onClick={openMemoModal}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </Button>
      </div>
      {memoModalOpen && (
        <MemoModal
          closeModal={() => {
            setMemoModalOpen(false);
          }}
          userId={userId}
          accessToken={accessToken}
          getAllUsers={() => {
            getAllUsers();
          }}
        />
      )}
    </div>
  );
}
