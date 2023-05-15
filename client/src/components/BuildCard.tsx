import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/buildCard.scss";
import Button from "./Button";
import comment from "../assets/icons/comment.png";
import {
  IPart,
  IPartsList,
  partsListTemplate,
  usePartsListContext,
} from "src/contexts/PartsListContext";
import BasicRating from "./BasicRating";
import apiClient from "src/services/apiClient";
import CommentsModal from "./CommentsModal";
import RatingModal from "./RatingModal";
interface BuildCardProps {
  build: any;
}

function BuildCard(props: BuildCardProps) {
  const { build } = props;
  const [parts, setParts] = useState(build.parts);
  const [currImg, setCurrImg] = useState(parts[0].image_url);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // partsList context variables
  const partsListVariables = usePartsListContext();
  const setPartsList = partsListVariables.setPartsList;

  function handleCustomizeBuild() {
    let partsList: IPartsList = partsListTemplate;
    parts.forEach((part: any) => {
      partsList = {
        ...partsList,
        [part.category]: { ...part, isAdded: true },
      };
    });
    setPartsList(partsList);
  }

  async function handleAddCart() {
    await apiClient.addToCart(build.id);
  }

  return (
    <main className="buildCard">
      <div className="buildCard__text">
        <div className="buildCard__title">
          <div className="builds__title">
            <p style={{ color: "#54aeef" }}>{"<"}</p>
            <p>{build.product_name}</p>
            <p style={{ color: "#54aeef" }}>{">"}</p>
          </div>
          <p className="buildCard__desc">{` ${build.build_description}`}</p>
        </div>
        <p className="buildCard__price">{`$${build.price}`}</p>
        <div
          onClick={() => {
            setModalOpen(true);
          }}
          className="buildCard__stars"
        >
          <BasicRating
            defaultRatingValue={build.ratings.avg_ratings}
            readOnly={true}
          />
        </div>
        <div className="buildCard__parts">
          {parts.length &&
            parts.map((part: any, index: number) => {
              return (
                <div key={index} className="buildCard__part">
                  <p className="buildCard__part-category">{`${parts[index].category}:`}</p>
                  <p>{`${part.product_name}`}</p>
                </div>
              );
            })}
        </div>
        <div className="buildCard__btns">
          <Button
            className="black-primary"
            style={{ padding: "1rem", width: "10rem" }}
            onClick={handleAddCart}
          >
            Add to Cart
          </Button>
          <Link to={"/mybuild"}>
            <Button
              className="blue-primary"
              style={{ padding: "1rem", width: "10rem" }}
              onClick={handleCustomizeBuild}
            >
              Customize
            </Button>
          </Link>
        </div>
        <div
          className="buildCard__comment"
          onClick={() => {
            setCommentsOpen(true);
          }}
        >
          <img src={comment} className="buildCard__comment-btn" />
          <p>Leave a comment</p>
        </div>
      </div>
      <div className="grid">
        <div className="grid__img-big">
          <img src={currImg} className="grid__img-big" />
        </div>

        {parts.map((part: IPart, index: number) => {
          return (
            <Link to={`/product/` + part.id} key={index}>
              <img
                src={part.image_url}
                className="grid__img"
                onMouseEnter={() => {
                  setCurrImg(part.image_url);
                }}
              />
            </Link>
          );
        })}
      </div>
      {commentsOpen && (
        <CommentsModal
          closeModal={() => {
            setCommentsOpen(false);
          }}
          productId={build.id}
          isBuild={true}
        />
      )}
      {modalOpen && (
        <RatingModal
          closeModal={() => {
            setModalOpen(false);
          }}
          id={build.id}
        />
      )}
    </main>
  );
}

export default BuildCard;
