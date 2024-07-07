import { CheckCircle } from "lucide-react";

interface OrderSuccessProps {
  orderNumber: string;
  setIsOrderSubmitted: (value: boolean) => void;
}

const OrderSuccess = ({
  orderNumber,
  setIsOrderSubmitted,
}: OrderSuccessProps) => {
  return (
    <div className="w-full h-screen bg-green-500 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-white">Order Submitted</h1>
      <CheckCircle size={100} className="text-white" />
      <p className="text-3xl">Order Number {orderNumber}</p>
      <p onClick={() => setIsOrderSubmitted(false)}>Go Back</p>
    </div>
  );
};

export default OrderSuccess;
