import { useOrderStore } from "@/stores/order.store";
import { CheckCircle, Undo } from "lucide-react";

interface OrderSuccessProps {
  orderNumber: string;
}

const OrderSuccess = () => {
  const { customerName, setOrderStatus, orderNumber } = useOrderStore();
  console.log("order number", orderNumber);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-green-500">
      <h1 className="text-2xl font-bold text-white">
        Order Submitted for{" "}
        {customerName !== "Anonymous" ? ": " + customerName : "!"}
      </h1>
      <CheckCircle size={50} className="text-white" />

      <div className="text-center">
        <p className="text-wrap text-2xl font-semibold">Order Number:</p>
        <span className="text-8xl font-semibold tracking-wide">
          {orderNumber}
        </span>
      </div>
      <div
        className="mt-4 flex cursor-pointer gap-4 text-black underline"
        onClick={() => setOrderStatus("Viewed")}
      >
        <Undo size={24} className="inline-block" />
        <p>Go Back </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
