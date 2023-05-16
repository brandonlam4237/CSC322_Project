import "../scss/modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import apiClient from "src/services/apiClient";

interface UserRowProps {
  closeModal: Function;
  userId: number;
  accessToken: string;
  getAllUsers: Function;
}

export interface IApprovalForm {
  is_active: boolean;
  memo: string;
}

function MemoModal(Props: UserRowProps) {
  const { closeModal, userId, accessToken, getAllUsers } = Props;
  const [memo, setMemo] = useState("");
  const [textareaBorder, setTextareaBorder] = useState({
    border: "solid 1.5px black",
  });

  async function handleRejectButton() {
    let approvalForm: IApprovalForm = {
      is_active: true,
      memo: `${memo}`,
    };
    if (!memo) {
      setTextareaBorder({ border: "solid 1.5px red" });
      return;
    }
      await apiClient.rejectUser(approvalForm, userId)
      getAllUsers();
      closeModal();
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <button
            className="modal__close-btn"
            onClick={() => {
              closeModal();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <div className="modal__title">
            <div className="accent">{"<"}</div> Rejection Memo{" "}
            <div className="accent">{">"}</div>
          </div>
        </div>
        <textarea
          style={textareaBorder}
          className="modal__textarea"
          id="memo"
          value={memo}
          placeholder="Enter rejection memo here"
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          onFocus={() => {
            setTextareaBorder({ border: "solid 1.5px #54aeef" });
          }}
          onBlur={() => {
            setTextareaBorder({ border: "solid 1.5px black" });
          }}
        />
        <button onClick={handleRejectButton} className="modal__submit-btn">
          Submit
        </button>
      </div>
      <div
        onClick={() => {
          closeModal();
        }}
        className="modal__overlay"
      />
    </div>
  );
}

export default MemoModal;
