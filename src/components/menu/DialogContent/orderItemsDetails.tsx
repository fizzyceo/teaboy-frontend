import OrderItemList from "@/components/order/orderItemList";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderItem, useOrderStore } from "@/stores/order.store";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { BookmarkPlus, Send } from "lucide-react";

const OrderItemsDetails = ({ handleNext }: any) => {
  const { orderItems } = useOrderStore();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {orderItems.length > 0 ? "Order Details" : "Basket is Empty"}
        </DialogTitle>
      </DialogHeader>
      <OrderItemList orderItems={orderItems} />
      <DialogFooter>
        <div className="flex w-full gap-2">
          <DialogTrigger asChild>
            <Button
              className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
              variant={"sendOrder"}
            >
              <span>Add More</span>
              <BookmarkPlus />
            </Button>
          </DialogTrigger>
          {orderItems.length > 0 && (
            <Button
              className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
              onClick={handleNext}
              variant={"nextStep"}
            >
              <span>Submit</span>
              <Send />
            </Button>
          )}
        </div>
      </DialogFooter>
    </>
  );
};
export default OrderItemsDetails;
