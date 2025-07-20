import React, { useState, useEffect, useCallback } from "react";
import './ListOrder.css';
import parcel_icon from './../../assets/parcel_icon.png';
import { toast } from "react-toastify";

const ListOrder = () => {
    const backend_url = process.env.REACT_APP_API_URL;
    const [orders, setOrders] = useState([]);

    // ✅ Stable fetchOrders function using useCallback
    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders`);
            const json = await response.json();

            if (response.ok) {
                setOrders(json);
            } else {
                toast.error(json.error || "Failed to fetch orders");
            }
        } catch (error) {
            toast.error("Network error while fetching orders");
            console.error(error);
        }
    }, [backend_url]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // ✅ Status update handler
    const statusHandler = async (event, orderId) => {
        const token = localStorage.getItem("token"); // ensure fresh token
        try {
            const response = await fetch(`${backend_url}/api/orders/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderId,
                    status: event.target.value
                }),
            });

            const json = await response.json();
            if (response.ok) {
                await fetchOrders(); // refresh after update
            } else {
                toast.error(json.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("Network error while updating order status");
            console.error(error);
        }
    };

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={parcel_icon} alt="Parcel" />
                        <div>
                            <p className='order-item-product'>
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} x {item.quantity}
                                        {idx !== order.items.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className='order-item-name'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <div className="order-item-address">
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                </p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                        >
                            <option value="Ordered">Ordered</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListOrder;
