import "../scss/commentsModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "./Button";
import apiClient from "src/services/apiClient";

interface UserRowProps {
  closeModal: Function;
  productId: number;
}

function CommentsModal(Props: UserRowProps) {
  const { closeModal, productId } = Props;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  async function fetchProductData() {
    const res = await fetch("http://localhost:8000/items/" + productId);
    const resJSON = await res.json();
    console.log(resJSON.product.comments);
    setComments(resJSON.product.comments);
  }

  async function handleSubmit() {
    await apiClient.addComment(productId, comment);
    setComment("");
    fetchProductData();
  }

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
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button className="blue-primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        {comments.length ? (
          <div className="comments-modal__comments">
            {comments.map((ele, i) => {
              return (
                <div key={i} className="comments-modal__comment">
                  <p className="comments-modal__username">{ele.username}</p>
                  <p>{ele.comment}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>No comments yet</div>
        )}
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
