import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/products.scss";
import ProductCard from "src/components/ProductCard";

function Prodcuts() {
  const { id } = useParams();
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchProducts() {
    const products = await fetch("/items?category=" + id);
    const productsJson = await products.json();
    setProductList(productsJson.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="products">
      <header className="title">
        <div className="title__accent">{"<"}</div>
        <div>{id}</div>
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
                image_url="https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                price={item.price}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Prodcuts;
