import { useOrderStore } from "@/stores/order.store";
import { CheckCircle, Undo } from "lucide-react";

const OrderSuccess = ({
  stepIndex,
  setStepIndex,
}: {
  stepIndex: number;
  setStepIndex: (index: number) => void;
}) => {
  const { customerName, setOrderStatus, orderNumber } = useOrderStore();
  console.log("order number", orderNumber);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-green-500">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white">
          Order Submitted{" "}
          {customerName && customerName !== "Anonymous"
            ? `for: ${customerName}`
            : ""}
        </h1>

        <CheckCircle size={50} className="text-white" />
      </div>

      <div className="text-center">
        <p className="text-wrap text-3xl font-semibold">Order Number:</p>
        <span className="text-8xl font-semibold tracking-wide">
          {orderNumber}
        </span>
      </div>
      <div
        className="mt-4 flex cursor-pointer gap-4 text-black underline"
        onClick={() => setStepIndex(0)}
      >
        <Undo size={24} className="inline-block" />
        <p>Go Back </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
