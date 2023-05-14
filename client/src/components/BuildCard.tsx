import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/buildCard.scss";
import Button from "./Button";
import comment from "../assets/icons/comment.png";

interface BuildCardProps {
  build: any;
}

function BuildCard(props: BuildCardProps) {
  const { build } = props;
  const [parts, setParts] = useState(build.parts);
  const [currImg, setCurrImg] = useState(parts[0].image_url);

  useEffect(() => {
    console.log(build);
  });

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
        <div className="buildCard__parts">
          {parts.length &&
            parts.map((part: any, i: number) => {
              return <p key={i}>{part.product_name}</p>;
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
        <Link to={`/product/` + parts[0].id}>
          <img
            src={parts[0].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[0].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[1].id}>
          <img
            src={parts[1].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[1].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[2].id}>
          <img
            src={parts[2].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[2].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[3].id}>
          <img
            src={parts[3].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[3].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[4].id}>
          <img
            src={parts[4].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[4].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[5].id}>
          <img
            src={parts[5].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[5].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[6].id}>
          <img
            src={parts[6].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[6].image_url);
            }}
          />
        </Link>
        <Link to={`/product/` + parts[7].id}>
          <img
            src={parts[7].image_url}
            className="grid__img"
            onMouseEnter={() => {
              setCurrImg(parts[7].image_url);
            }}
          />
        </Link>
      </div>
    </main>
  );
}

export default BuildCard;
