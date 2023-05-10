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

export default function OrderHistory(){
    const [orderArr, setOrderArr] = useState<any[]>();
    const [isLoading, setisLoading] = useState<boolean>(true);

    async function fetchOrders() {
        const userOrders = await apiClient.getOrders() // returns a list of orders, order object has list of cart items
        setOrderArr(userOrders)
        
    }
    useEffect(() => {
        fetchOrders();
        setisLoading(false); 
    }, []);

    
    return isLoading? (
        <h1>Loading...</h1>
    ) : (
    <main className="cart-page">
        <div className="cart">
            <div className="cart__title">
            <p className="cart__title-accent">{"<"}</p>
            <p>Order History</p>
            <p className="cart__title-accent">{">"}</p>
            </div>

            {/* If the orderArr list is empty*/}
            {orderArr && orderArr.length == 0 && (
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    No Orders Have Been Made
                </div>
            )}

            {/* If the orderArr list is not empty*/}
            {orderArr && orderArr.length != 0 && (
                <div className="cart__item-list">
                    {orderArr.map((order, i) =>{ 
                        return (
                            <>
                                <div className="cart__title">
                                    <p className="cart__title-accent">{"<"}</p>
                                    <p>Order #{order["id"]}</p>
                                    <p className="cart__title-accent">{">"}</p>
                                </div>
                                {order.items.map((item:any, j:number) => {
                                    return(
                                        <>
                                            <div key={i} className="cart__item">
                                                <div className="cart__item-details">
                                                    <div className="cart__item-name">
                                                        {item.product.product_name}                                                    </div>
                                                    <div>{`$${order.items[j].price}`}</div>
                                                    <div>{`Quantity: ${order.items[j].quantity}`}</div>
                                                </div>
                                                <img
                                                    className="cart__item-img"
                                                    src= {item.product.image_url}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                                <div className="cart__total">
                                    <p>Total: {`$${order.total_price}`}</p>
                                </div>
                            </>
                        )})}
                </div>
            )}
            
        </div>
    </main>
    );
}

// Sort orders
// Fix order boxes