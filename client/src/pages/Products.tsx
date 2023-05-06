import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/products.scss";
import ProductCard from "src/components/ProductCard";

function Prodcuts() {
  const { id: category } = useParams();
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchProducts() {
    const products = await fetch("/items?category=" + category);
    const productsJson = await products.json();
    setProductList(productsJson.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <main className="products">
      <header className="title">
        <div className="title__accent">{"<"}</div>
        <div>{category}</div>
        <div className="title__accent">{">"}</div>
      </header>
      <div className="products__grid">
        {/* product card with temp img src */}
        {!loading &&
          productList.map((item, i) => {
            return (
              <ProductCard
                key={i}
                product_name={item.product_name}
                image_url="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg"
                price={item.price}
                id={item.id}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Prodcuts;
