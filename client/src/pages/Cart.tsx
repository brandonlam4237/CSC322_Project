import "../scss/cart.scss";
import apiClient from "src/services/apiClient";
import { useEffect, useState } from "react";

function Cart() {
  const [itemsArr, setItemsArr] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);
  async function fetchCart() {
    const res = await apiClient.getCustomerCart();
    console.log(res.items[0].product.product_name);
    setItemsArr(res.items);
    setTotal(res.total_price);
  }
  useEffect(() => {
    console.log(itemsArr);
  }, [itemsArr]);
  return (
    <main className="cart-page">
      <div className="cart">
        <div className="cart__title">
          <p className="cart__title-accent">{"<"}</p>
          <p>Shopping Cart</p>
          <p className="cart__title-accent">{">"}</p>
        </div>
        <div className="cart__item-list">
          {itemsArr?.map((item, i) => {
            return (
              <div key={i} className="cart__item">
                <div>{item.product.product_name}</div>
                <div>{item.product.quantity}</div>
                <div>{item.product.price}</div>
              </div>
            );
          })}
        </div>
        <div>{total}</div>
      </div>
    </main>
  );
}

export default Cart;
