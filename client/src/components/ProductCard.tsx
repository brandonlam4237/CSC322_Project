import { Link } from "react-router-dom";
import "../scss/productCard.scss";
import Button from "./Button";
import apiClient from "src/services/apiClient";
import { usePartsListContext } from "src/contexts/PartsListContext";
import Box from "./Box";
interface ProductCardProps {
  product_name: string;
  image_url: string;
  price: string;
  category: string;
  id: number;
  isCompatible:boolean
}

function ProductCard(props: ProductCardProps) {
  const { product_name, price, image_url, category, id, isCompatible } = props;

  async function handleAddCart() {
    await apiClient.addToCart(id);
  }

  const partsListVariables = usePartsListContext();
  const addPartToBuild = partsListVariables.addPart;

  function handleAddBuild() {
    const part = {
      id: id,
      product_name: product_name,
      price: Number(price),
      image_url: image_url,
      component_name: category,
      isAdded: true,
    };
    addPartToBuild(part);
  }

  return (
    <div className="productCard">
      <Link to={`${"/product/" + id}`} className="productCard__img-container">
        <img src={image_url} className="productCard__img" />
      </Link>
      <Link to={`${"/product/" + id}`}>
        <div className="productCard__name">
        {isCompatible && category !="Desktop"  ? <Box color="green" padding={5}>{product_name}</Box> : product_name}
        </div>
      </Link>
      <footer className="productCard__footer">
        <div className="productCard__price">{"$" + price}</div>
        <div className="productCard__btns">
          <Button className="blue-primary" onClick={handleAddCart}>
            Add to cart
          </Button>
          <Link to={"/myBuild"}>
            <Button className="black-primary" onClick={handleAddBuild}>
              Add to build
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default ProductCard;
