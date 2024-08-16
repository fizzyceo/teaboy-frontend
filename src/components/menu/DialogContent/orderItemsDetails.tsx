import OrderItemCard from "@/components/order/orderItemCard";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
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
        <DialogTitle>Order Items</DialogTitle>
      </DialogHeader>
      <div className="no-scrollbar flex max-h-[47vh] w-full snap-y flex-col gap-3 overflow-scroll px-1">
        {orderItems.map((item: OrderItem) => (
          <OrderItemCard {...item} key={item.menuItemId} />
        ))}
      </div>
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
          <Button
            className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
            onClick={handleNext}
            variant={"nextStep"}
          >
            <span>Submit</span>
            <Send />
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
export default OrderItemsDetails;
