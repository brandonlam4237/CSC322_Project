import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/products.scss";
import ProductCard from "src/components/ProductCard";
import apiClient from "src/services/apiClient";

function Prodcuts() {
  const category = useParams().id || "";
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productIds, setProductIds] = useState<any[]>([]);

  async function fetchProducts() {
    const productsJson = await apiClient.getItemsByCategory(category)
    setProductList(productsJson.products);
    setLoading(false);
  }

  async function fetchCart() {
    const res = await apiClient.getCustomerCart();
    var ids: any[] = []
    for(let i=0; i<res.items.length; i++){
      ids.push(res.items[i].product.id)
    }
    setProductIds(ids);
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
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
                isInCart = {productIds.includes(item.id) ? true : false}
              />
            );
          })}
      </div>
    </main>
  );
}

export default Prodcuts;
