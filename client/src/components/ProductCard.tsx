import { Link } from "react-router-dom";
import "../scss/productCard.scss";
import Button from "./Button";
import apiClient from 'src/services/apiClient';
interface ProductCardProps {
  product_name: string;
  image_url: string;
  price: string;
  id: number;
}

function ProductCard(props: ProductCardProps) {
  const { product_name, price, image_url, id } = props;

  async function handleAddCart(){
    await apiClient.addToCart(id)
  }

  return (
    <div className="productCard">
      <Link to={`${"/product/" + id}`} className="productCard__img-container">
        <img src={image_url} className="productCard__img" />
      </Link>
      <Link to={`${"/product/" + id}`}>
        <div className="productCard__name">{product_name}</div>
      </Link>
      <footer className="productCard__footer">
        <div className="productCard__price">{"$" + price}</div>
        <div className="productCard__btns">
          <Button className="blue-primary" onClick={handleAddCart}>Add to cart</Button>
          <Link to={"/myBuild"}><Button className="black-primary">Add to build</Button></Link>
        </div>
      </footer>
    </div>
  );
}

export default ProductCard;
