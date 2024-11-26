import { translateString } from "@/lib/translate";
import { useOrderStore } from "@/stores/order.store";
import { CheckCircle, Undo } from "lucide-react";

const OrderSuccess = ({
  lang,
  stepIndex,
  setStepIndex,
}: {
  lang: string;
  stepIndex: number;
  setStepIndex: (index: number) => void;
}) => {
  const { customerName, orderNumber } = useOrderStore();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-green-500 bg-gradient-to-b landscape:items-center landscape:justify-start landscape:gap-4">
      <div className="flex flex-col items-center gap-4 landscape:flex-row">
        <h1 className="text-xl font-bold text-white">
          {translateString("Order Submitted", lang)}{" "}
          {customerName && customerName !== "Anonymous"
            ? `${translateString("for", lang)}: ${customerName}`
            : ""}
        </h1>

        <CheckCircle className="text-white" />
      </div>

      <div className="text-center">
        <p className="text-wrap text-2xl font-semibold">
          {translateString("Order Number", lang)}:
        </p>
        <span className="text-8xl font-semibold tracking-wide">
          {orderNumber}
        </span>
      </div>

      <div
        className="flex cursor-pointer gap-4 text-black underline"
        onClick={() => setStepIndex(0)}
      >
        <Undo size={24} className="inline-block" />
        <p>{translateString("Go Back", lang)} </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
