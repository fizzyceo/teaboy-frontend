import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { OrderItem, useOrderStore } from "@/stores/order.store";
import submitOrder from "@/actions/order/submit-order";

import { Receipt } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import OrderItemCard from "./orderItemCard";
import OrderSuccess from "./orderSuccess";
import cancelOrder from "@/actions/order/cancel-order";
import { DialogTrigger } from "@radix-ui/react-dialog";

const OrderDrawer = ({ table_number }: { table_number: number }) => {
  const {
    orderItems,
    setOrderItems,
    orderStatus,
    customerName,
    setCustomerName,
    setOrderStatus,
  } = useOrderStore();

  const [showCustomerNameInput, setShowCustomerNameInput] = useState(false);
  const [orderResponse, setOrderResponse] = useState<any>({});

  const total = orderItems.reduce(
    (acc: number, item: OrderItem) => acc + item.menuItemPrice,
    0,
  );

  const handleOrderCancel = async () => {
    setOrderStatus("Canceled");
    setShowCustomerNameInput(false);
    setOrderItems([]);
    await cancelOrder(orderResponse.order_id);
    toast.info("Order Canceled", { duration: 1200 });
    setTimeout(() => {
      setOrderStatus("Not Submitted");
    }, 2000);
  };

  const handleSubmitOrder = async () => {
    const order = {
      customer_name: "Anonymous",
      table_number: table_number || 0,
      spaceId: 1,
      order_items: orderItems.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: 1,
        note: item.note,
        status: "PENDING",
        choices: item.choices?.map((choice) => ({
          menu_item_option_choice_id: choice.menu_item_option_choice_id,
        })),
      })),
    };

    const response = await submitOrder(order);

    if (response.success) {
      setOrderStatus("Submitted");

      toast.success("Order submitted successfully", { duration: 1000 });
    } else {
      setOrderStatus("Not Submitted");
      toast.error("Failed to submit order", { duration: 1000 });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div
          className={cn(
            orderItems.length === 0 ? "hidden" : "flex w-full gap-4",
          )}
        >
          {total > 0 && (
            <div className="flex w-2/3 items-center justify-center gap-2 rounded-sm border-dotted border-gray-700 bg-white text-lg font-semibold">
              <Receipt />
              {total} $
            </div>
          )}
          <Button
            className={cn(
              orderItems.length === 0 ? "hidden" : "",
              "h-14 w-full rounded-3xl text-2xl",
            )}
          >
            {orderStatus === "Not Submitted" ? "Submit Order" : "Review Order"}
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent
        className={orderStatus === "Submitted" ? "h-screen" : "h-auto pb-8"}
      >
        {orderStatus === "Not Submitted" ||
        orderStatus === "Viewed" ||
        orderStatus === "Canceled" ? (
          <div>
            {orderItems.length > 0 && (
              <DrawerHeader>
                <h1 className="text-2xl font-bold">Order Details</h1>
              </DrawerHeader>
            )}

            <div className="no-scrollbar flex max-h-[60vh] w-full snap-y flex-col gap-2 overflow-scroll px-4">
              {orderItems.map((item: OrderItem) => (
                <OrderItemCard {...item} key={item.menuItemId} />
              ))}
            </div>
            <DrawerFooter className="flex w-full flex-col gap-4 px-4 py-2">
              {orderItems.length == 0 ? (
                <DialogTrigger>
                  <Button className="w-full text-xl">Add More</Button>
                </DialogTrigger>
              ) : (
                <>
                  {total > 0 && (
                    <div className="flex justify-center rounded-md bg-slate-200 px-4 py-2 shadow-lg">
                      <p className="text-xl">
                        Total Price: <span className="font-bold">{total}</span>{" "}
                        DA
                      </p>
                    </div>
                  )}

                  {orderStatus === "Viewed" || orderStatus === "Canceled" ? (
                    <div className="flex w-full gap-2">
                      {/* <Button
                        variant={"destructive"}
                        onClick={handleOrderCancel}
                        className="w-full"
                      >
                        Cancel
                      </Button> */}
                      {orderStatus !== "Canceled" && (
                        <Button
                          variant={"outline"}
                          className="w-full bg-green-600 text-lg text-white"
                          onClick={() => setOrderStatus("Submitted")}
                        >
                          View Order Number
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        className="w-full text-xl"
                        onClick={handleSubmitOrder}
                      >
                        {orderStatus == "Not Submitted"
                          ? "Submit Order"
                          : "Review Order"}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </DrawerFooter>
          </div>
        ) : (
          <OrderSuccess />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
