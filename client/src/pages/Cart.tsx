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
    console.log(res.items[0].product.quantity);
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
        {itemsArr.length === 0 && (
          <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            Cart is empty
          </div>
        )}
        {itemsArr.length !== 0 && (
          <div className="cart__item-list">
            {itemsArr?.map((item, i) => {
              return (
                <div key={i} className="cart__item">
                  <div className="cart__item-details">
                    <div className="cart__item-name">
                      {item.product.product_name}
                    </div>
                    <div>{`Quantity: ${item.quantity}`}</div>
                    <div>{`$${item.product.price}`}</div>
                  </div>
                  <img
                    className="cart__item-img"
                    src="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg"
                  />
                </div>
              );
            })}
            <div className="cart__total">
              <p>Total:</p>
              <p>{`$${total}`}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
