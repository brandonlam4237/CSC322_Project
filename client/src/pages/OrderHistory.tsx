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

const orderFields: string[] = [
    "orderNumber",
    "datetime_ordered", 
    "total_price", 
];

const itemFields: string[] = [
    "product_name", 
    "quantity", 
    "price", 
    "image_url" 
];

export default function OrderHistory(){
    const [orderArr, setOrderArr] = useState<any[]>([{
		"id": 1,
		"items": [
			{
				"product": {
					"id": 94,
					"brand": "Lian Li",
					"product_name": "Uni Fan SL120 V2 Fluid Dynamic Bearing 120mm Case Fan - Black 3 Pack",
					"price": "89.99",
					"comments": []
				},
				"quantity": 1,
				"price": 89.99
			}
		],
		"address": "address",
		"datetime_ordred": "2023-05-09T18:39:20.949954Z",
		"total_price": "89.99"
	}]);
    const [isLoading, setisLoading] = useState<boolean>(true);

    async function fetchOrders() {
        const userOrders = await apiClient.getOrders() // returns a list of orders, order object has list of cart items
        setOrderArr(userOrders)
        
    }
    useEffect(() => {
        fetchOrders();
        setisLoading(false); 
    }, []);

    // useEffect(() => {
    //     console.log(orderArr[0].items);
    // }, [orderArr]);
    
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
                            <div>
                                {order.items.map((item:any, j:number) => {
                                    return(
                                        <p>{item.price}</p>
                                    )
                                })}
                            </div>
                        )})}
                {/* {orderArr.map((order, i) => {
                return (
                    <div key={i} className="cart__item">
                    <div className="cart__item-details">
                        <div className="cart__item-name">
                        {order.items[i].product_name}
                        </div>
                        <div>{`$${order.items[i].price}`}</div>
                        <div>{`Quantity: ${order.items[i].quantity}`}</div>
                    </div>
                    <img
                        className="cart__item-img"
                        src="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg"
                    />
                        <div className="cart__total">
                            <p>Total:</p>
                            <p>{`$${order.total_price}`}</p>
                        </div>
                    </div>
                );
                })} */}
            </div>
            )}
            
        </div>
    </main>
    );
}

// use apiClient for insomnia population for testing
// use function in apiClient because of need of access token -> DONE
// use productdetail as reference for fetching an individual product
// use approve.tsx for how to map over an array and return html code -> nested map
// use the stupid button testing method to check apis (make button handler, click, check in inspect element)
// consider using partsTable.tsx as reference for using tables for displaying the orders
// Might need to make orderRow and itemRow files in components to use for the mapping
// use id to get image_url (productdetail.jsx)