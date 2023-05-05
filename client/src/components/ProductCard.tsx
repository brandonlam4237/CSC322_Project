import "../scss/productCard.scss";

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
      <div className="productCard__price">{"$" + price}</div>
    </div>
  );
}

export default ProductCard;
