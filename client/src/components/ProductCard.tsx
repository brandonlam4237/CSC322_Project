import "../scss/productCard.scss";
import Button from "./Button";

interface ProductCardProps {
  product_name: string;
  image_url: string;
  price: string;
}

function ProductCard(props: ProductCardProps) {
  const { product_name, price, image_url } = props;
  return (
    <div className="productCard">
      <div className="productCard__img-container">
        <img src={image_url} className="productCard__img" />
      </div>
      <div className="productCard__name">{product_name}</div>
      <footer className="productCard__footer">
        <div className="productCard__price">{"$" + price}</div>
        <div className="productCard__btns">
          <Button className="blue-primary">Add to cart</Button>
          <Button className="black-primary">Add to build</Button>
        </div>
      </footer>
    </div>
  );
}

export default ProductCard;
