interface ProductCardProps {
  product_name: string;
  image_url: string;
  price: string;
}

function ProductCard(props: ProductCardProps) {
  const { product_name, price, image_url } = props;
  return (
    <div>
      <div>{product_name}</div>
      <img src={image_url} />
      <div>{price}</div>
    </div>
  );
}

export default ProductCard;
