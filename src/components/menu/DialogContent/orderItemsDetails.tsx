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

const OrderItemsDetails = ({ handleNext }: any) => {
  const { orderItems } = useOrderStore();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Order Items</DialogTitle>
      </DialogHeader>
      <div className="no-scrollbar flex max-h-[55vh] w-full snap-y flex-col gap-3 overflow-scroll">
        {orderItems.map((item: OrderItem) => (
          <OrderItemCard {...item} key={item.menuItemId} />
        ))}
      </div>
      <DialogFooter>
        <div className="flex gap-2">
          <DialogTrigger asChild>
            <Button className="w-full bg-blue-300 text-lg text-black">
              Add More
            </Button>
          </DialogTrigger>

          <Button
            className="w-full bg-green-500 text-lg text-black"
            onClick={handleNext}
          >
            Submit
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
export default OrderItemsDetails;
