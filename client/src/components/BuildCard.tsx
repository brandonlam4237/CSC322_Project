import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/buildCard.scss";

interface BuildCardProps {
  build: any;
}

function BuildCard(props: BuildCardProps) {
  const { build } = props;
  const [parts, setParts] = useState(build.parts);
  const [currImg, setCurrImg] = useState(parts[0].image_url);

  useEffect(() => {
    console.log(parts);
  });

  return (
    <main className="buildCard">
      <p>{build.price}</p>
      <p>{build.build_description}</p>
      <p>{build.product_name}</p>
      <div className="grid">
        <img src={currImg} className="grid__img-big" />
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
