// branch: feat-OrderPage

// Super:
// user: thedreamfish
// pass: password1234

// Customer:
// user: justinjacob
// pass: 1234

// npm start in client
// python manage.py runserver in server
// in this page, users can look at their order history
import apiClient from "src/services/apiClient";
import { useEffect, useState } from "react";
import "../scss/orderHistory.scss";

export default function OrderHistory() {
  const [orderArr, setOrderArr] = useState<any[]>();
  const [isLoading, setisLoading] = useState<boolean>(true);

  async function fetchOrders() {
    const userOrders = await apiClient.getOrders(); // returns a list of orders, order object has list of cart items
    setOrderArr(userOrders);
  }
  useEffect(() => {
    fetchOrders();
    setisLoading(false);
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className="order-history-page">
      <div className="order-history">
        <div className="order-history__title">
          <p className="order-history__title-accent">{"<"}</p>
          <p>Order History</p>
          <p className="order-history__title-accent">{">"}</p>
        </div>

        {/* If the orderArr list is empty*/}
        {orderArr && orderArr.length == 0 && (
          <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            No Orders Have Been Made
          </div>
        )}

        {/* If the orderArr list is not empty*/}
        {orderArr && orderArr.length != 0 && (
          <div className="order-history__item-list">
            {orderArr.map((order, i) => {
              return (
                <div className="order-history__container">
                  <div className="order-history__title-inner">
                    <p className="order-history__title-accent">{"<"}</p>
                    <p>Order #{order["id"]}</p>
                    <p className="order-history__title-accent">{">"}</p>
                  </div>
                  {order.items.map((item: any, j: number) => {
                    return (
                      <>
                        <div key={i} className="order-history__item">
                          <div className="order-history__item-details">
                            <div className="order-history__item-name">
                              {item.product.product_name}
                            </div>
                            <div>{`$${order.items[j].price}`}</div>
                            <div>{`Quantity: ${order.items[j].quantity}`}</div>
                          </div>
                          <img
                            className="order-history__item-img"
                            src={item.product.image_url}
                          />
                        </div>
                      </>
                    );
                  })}
                  <div className="order-history__total">
                    <p>Total:</p>
                    <p>{`$${order.total_price}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

// Fix order boxes
