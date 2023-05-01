import { close } from "inspector";
import "../scss/modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface UserRowProps {
  closeModal: Function;
}

function MemoModal(Props: UserRowProps) {
  const { closeModal } = Props;
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          onClick={() => {
            closeModal();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </button>
        <form className="modal__form">
          <label>Rejection Memo</label>
          <textarea className="modal__textarea" />
          <button>Submit</button>
        </form>
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
