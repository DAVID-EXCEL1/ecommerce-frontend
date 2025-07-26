import { Link } from "react-router-dom";

const OrderSuccessPage = () => (
    <div className="p-4 text-center">
        <h2 className="text-2xl font-bold">🎉 Order Placed Successfully!</h2>
        <p className="mt-2">Thank you for shopping with us, David.</p>
        <p className="mt-2">Your order is being processed and will be shipped soon.</p>
        <p className="mt-4">If you have any questions, feel free to contact our support team.</p>
        <p className="mt-4">
            <Link to="/home" className="text-blue-500 hover:underline">
                Go back to Home
            </Link>
        </p>
        <p className="mt-2">
            <Link to="/my-orders" className="text-blue-500 hover:underline">
                View My Orders
            </Link>
        </p>
    </div>
);

export default OrderSuccessPage;
