import React, { useEffect, useState, useCallback } from 'react';
import './CSS/MyOrders.css';
import parcel_icon from './../assets/parcel_icon.png';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const backend_url = process.env.REACT_APP_API_URL;

    // ✅ Moved token inside fetchOrders to avoid stale values
    const fetchOrders = useCallback(async () => {
        const token = localStorage.getItem('token'); // moved here
        try {
            const response = await fetch(`${backend_url}/api/orders/userorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                }
            });

            const json = await response.json();

            if (response.ok) {
                setData(json);
            } else {
                console.error("Failed to fetch orders:", json.error || "Unknown error");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }, [backend_url]);

    // ✅ No dependency warning now
    useEffect(() => {
        const token = localStorage.getItem('token'); // also read it here
        if (token) {
            fetchOrders();
        }
    }, [fetchOrders]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order card">
                        <img src={parcel_icon} alt="Parcel Icon" />
                        <p>
                            {order.items.map((item, idx) => (
                                <span key={idx}>
                                    {item.name} x {item.quantity}
                                    {idx !== order.items.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p>
                            <span>&#x25cf;</span> <b>{order.status}</b>
                        </p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
