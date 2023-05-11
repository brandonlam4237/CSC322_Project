import "../scss/commentsModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "./Button";

interface UserRowProps {
  closeModal: Function;
  productId: number;
}

function CommentsModal(Props: UserRowProps) {
  const { closeModal, productId } = Props;

  return (
    <div className="comments-modal">
      <div className="comments-modal__content">
        <div className="comments-modal__header">
          <button
            className="comments-modal__close-btn"
            onClick={() => {
              closeModal();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <div className="comments-modal__title">
            <div style={{ color: "#54aeef" }}>{"<"}</div> Comments
            <div style={{ color: "#54aeef" }}>{">"}</div>
          </div>
        </div>
        <div className="comments-modal__comment-sub">
          <textarea
            className="comments-modal__text-field"
            placeholder="Leave a comment"
          />
          <Button className="blue-primary">Submit</Button>
        </div>
      </div>
      <div
        onClick={() => {
          closeModal();
        }}
        className="comments-modal__overlay"
      />
    </div>
  );
}

export default CommentsModal;
