import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/buildCard.scss";
import Button from "./Button";
import comment from "../assets/icons/comment.png";
import { IPart } from "src/contexts/PartsListContext";
import BasicRating from "./BasicRating";

interface BuildCardProps {
  build: any;
}

function BuildCard(props: BuildCardProps) {
  const { build } = props;
  const [parts, setParts] = useState(build.parts);
  const [currImg, setCurrImg] = useState(parts[0].image_url);
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
          <BasicRating defaultRatingValue={build.ratings.avg_ratings} readOnly={true}/>
        <div className="buildCard__parts">
          {parts.length &&
            parts.map((part: any, index: number) => {
              return <p key={index}>{part.product_name}</p>;
            })}
        </div>
        <div className="buildCard__btns">
          <Button
            className="black-primary"
            style={{ padding: "1rem", width: "10rem" }}
          >
            Add to Cart
          </Button>
          <Button
            className="blue-primary"
            style={{ padding: "1rem", width: "10rem" }}
          >
            Customize
          </Button>
        </div>
        <div className="buildCard__comment">
          <img src={comment} className="buildCard__comment-btn" />
          <p>Leave a comment</p>
        </div>
      </div>
      <div className="grid">
        <div className="grid__img-big">
          <img src={currImg} className="grid__img-big" />
        </div>

        {parts.map((part:IPart, index: number) => {
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
    </main>
  );
}

export default BuildCard;
