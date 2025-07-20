import React, { useEffect, useCallback } from "react";
import "./CSS/Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
    const [searchParams] = useSearchParams(); // ✅ only keep what's used
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_API_URL;

    // ✅ Wrapped in useCallback to avoid dependency warning
    const verifyPayment = useCallback(async () => {
        try {
            const response = await fetch(`${backend_url}/api/orders/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ success, orderId }),
            });

            if (response.ok) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification error:", error);
            navigate("/");
        }
    }, [backend_url, success, orderId, navigate]);

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
