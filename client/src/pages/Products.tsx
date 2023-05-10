import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/products.scss";
import ProductCard from "src/components/ProductCard";
import apiClient from "src/services/apiClient";

function Prodcuts() {
  const category = useParams().id || "";
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchProducts() {
    const productsJson = await apiClient.getItemsByCategory(category)
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
                image_url={item.image_url}
                price={item.price}
                category = {category}
                id={item.id}
                isCompatible = {item.isCompatible}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Prodcuts;
