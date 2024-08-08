import OrderItemCard from "@/components/order/orderItemCard";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderItem, useOrderStore } from "@/stores/order.store";

const OrderItemsDetails = ({ handleNext }: any) => {
  const { orderItems } = useOrderStore();
  const fakeHndl = () => {};
  return (
    <>
      <DialogHeader>
        <DialogTitle>Order Items</DialogTitle>
      </DialogHeader>
      <div className="no-scrollbar flex max-h-[60vh] w-full snap-y flex-col gap-2 overflow-scroll">
        {orderItems.map((item: OrderItem) => (
          <OrderItemCard {...item} key={item.menuItemId} />
        ))}
      </div>
      <DialogFooter>
        <div className="flex gap-2">
          <Button className="w-full text-lg" onClick={fakeHndl}>
            Add More
          </Button>
          <Button className="w-full text-lg" onClick={handleNext}>
            Submit
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
export default OrderItemsDetails;
