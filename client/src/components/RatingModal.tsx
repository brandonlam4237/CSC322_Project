import "../scss/ratingModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BasicRating from "./BasicRating";
import Button from "./Button";
import apiClient from "src/services/apiClient";

interface RatingModalProps {
  closeModal: Function;
  id: number;
  submitRating: Function;
}

function RatingModal(Props: RatingModalProps) {
  const { closeModal, id, submitRating } = Props;
  const [rating, setRating] = useState<number | null>(0);

  function handleClick() {
    submitRating(rating, id);
  }

  return (
    <div className="ratingModal">
      <div className="ratingModal__content">
        <div className="ratingModal__header">
          <button
            className="ratingModal__close-btn"
            onClick={() => {
              closeModal();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
          </button>
          <div className="ratingModal__title">
            <div className="accent">{"<"}</div> Rate this build
            <div className="accent">{">"}</div>
          </div>
        </div>
        <div className="ratingModal__rating">
          <BasicRating
            name="read-only"
            defaultRatingValue={rating}
            setRating={setRating}
          />
        </div>
        <Button
          className="ratingModal__submit-btn blue-primary"
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
      <div
        onClick={() => {
          closeModal();
        }}
        className="ratingModal__overlay"
      />
    </div>
  );
}

export default RatingModal;
