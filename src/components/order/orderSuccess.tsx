import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  orderNumber: string;
  customer_name: string;
  setOrderStatus: (value: "Submitted" | "Viewed" | "Not Submitted") => void;
}

const OrderSuccess = ({
  orderNumber,
  customer_name,
  setOrderStatus,
}: OrderSuccessProps) => {
  console.log("order number", orderNumber);
  return (
    <div className="w-full h-screen bg-green-500 flex flex-col justify-center items-center">
      <p className="text-white">Thank you for your order, {customer_name}</p>
      <h1 className="text-2xl font-bold text-white">Order Submitted</h1>
      <CheckCircle size={100} className="text-white" />
      <p className="text-3xl">Order Number: {orderNumber}</p>
      <p
        className="text-white underline cursor-pointer mt-4"
        onClick={() => setOrderStatus("Viewed")}
      >
        Go back
      </p>
    </div>
  );
};

export default OrderSuccess;
