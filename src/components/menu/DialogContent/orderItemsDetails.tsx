import OrderItemList from "@/components/order/orderItemList";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { translateString } from "@/lib/translate";
import { OrderItem, useOrderStore } from "@/stores/order.store";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { BookmarkPlus, Send } from "lucide-react";

const OrderItemsDetails = ({
  lang,
  handleNext,
}: {
  lang: string;
  handleNext: any;
}) => {
  const { orderItems } = useOrderStore();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {orderItems.length > 0
            ? translateString("Order Details", lang)
            : translateString("Basket is Empty", lang)}
        </DialogTitle>
      </DialogHeader>
      <OrderItemList lang={lang} orderItems={orderItems} />
      <DialogFooter>
        <div className="flex w-full gap-2">
          <DialogTrigger asChild>
            <Button
              className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
              variant={"sendOrder"}
            >
              <span>{translateString("Add More", lang)}</span>
              <BookmarkPlus />
            </Button>
          </DialogTrigger>
          {orderItems.length > 0 && (
            <Button
              className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
              onClick={handleNext}
              variant={"nextStep"}
            >
              <span>{translateString("Submit", lang)}</span>
              <Send />
            </Button>
          )}
        </div>
      </DialogFooter>
    </>
  );
};
export default OrderItemsDetails;
