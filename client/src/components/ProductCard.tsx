import { Link } from "react-router-dom";
import "../scss/productCard.scss";
import Button from "./Button";
import apiClient from "src/services/apiClient";
import { usePartsListContext } from "src/contexts/PartsListContext";
import { useAuthContext } from "src/contexts/AuthContext";
import {useState } from "react";
interface ProductCardProps {
  product_name: string;
  image_url: string;
  price: string;
  category: string;
  id: number;
  isCompatible: boolean;
  isInCart?: boolean;
}

function ProductCard(props: ProductCardProps) {
  const { product_name, price, image_url, category, id, isCompatible, isInCart=false } = props;
  let buttonClassName =
    isCompatible && category != "Desktop" ? "green-primary" : "black-primary";

  const [prodInCart, setProdInCart] = useState<boolean>(isInCart);
  
  async function handleAddCart() {
    await apiClient.addToCart(id);
    setProdInCart(!prodInCart)
  }

  async function handleRemoveFromCart() {
    await apiClient.editItemQuantity(0, id);
    setProdInCart(!prodInCart)
  }

  const user = useAuthContext().userData;
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
        <div className="productCard__name">{product_name}</div>
      </Link>
      <footer className="productCard__footer">
        <div className="productCard__price">{"$" + price}</div>

        {user.is_active && user.user_type != "Visitor" && (
          <div className="productCard__btns">
            {prodInCart ? (
              <Button className="red-primary" onClick={handleRemoveFromCart}> 
              Remove From Cart
              </Button>
            ) : (
              <Button className="blue-primary" onClick={handleAddCart}>
              Add to cart
              </Button>
            )}

            <Link to={"/myBuild"}>
              <Button className={buttonClassName} onClick={handleAddBuild}>
                Add to build
              </Button>
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
}

export default ProductCard;
