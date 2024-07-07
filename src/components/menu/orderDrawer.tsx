"use client";
import { useState } from "react";
import { toast } from "sonner";
import submitOrder from "@/actions/submit-order";
import { OrderItem, useOrderStore } from "@/stores/order.store";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import OrderItemCard from "./orderItemCard";
import OrderSuccess from "./orderSuccess";
import { cn } from "@/lib/utils";
import { Receipt } from "lucide-react";
import CustomerNameDialog from "./customerNameDialog";

const OrderDrawer = () => {
  const { orderItems } = useOrderStore();
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const total = orderItems.reduce(
    (acc: number, item: OrderItem) => acc + item.menuItemPrice * item.quantity,
    0
  );

  const handleSubmitOrder = async () => {
    const order = {
      customer_name: "Moncef Moussaoui test",
      table_number: 0,
      order_items: orderItems.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        note: item.note,
        status: "PENDING",
      })),
    };
    if (orderItems.length === 0)
      return toast.error("Please add items to your order", { duration: 1000 });

    if (orderItems.some((item) => item.quantity === 0))
      return toast.error("Please remove items with quantity 0", {
        duration: 1000,
      });

    const response = await submitOrder(order);

    if (response.success) {
      setIsOrderSubmitted(true);
      toast.success("Order submitted successfully", { duration: 1000 });
    } else {
      setIsOrderSubmitted(false);
      toast.error("Failed to submit order", { duration: 1000 });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className={cn(orderItems.length == 0 ? "hidden" : "w-full flex")}>
          <div className="flex justify-center items-center gap-2 basis-1/3 border-dotted rounded-sm border-gray-700">
            <Receipt />
            {total} DA
          </div>
          <Button
            className={cn(
              orderItems.length == 0 ? "hidden" : "",
              "basis-2/3 w-full text-xl"
            )}
          >
            Check order
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className={isOrderSubmitted ? "h-screen" : "h-auto pb-8"}>
        {!isOrderSubmitted ? (
          <div>
            <DrawerHeader>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-scroll no-scrollbar snap-y w-full">
                {orderItems.map((item: OrderItem) => (
                  <OrderItemCard {...item} key={item.menuItemId} />
                ))}
              </div>
            </DrawerHeader>
            <DrawerFooter className="flex flex-col gap-4 w-full px-4 py-2">
              {total > 0 && (
                <>
                  <div className="flex justify-center px-4 py-2 bg-slate-200 rounded-md shadow-lg">
                    <p className="text-xl">
                      Total Price: <span className="font-bold">{total}</span> DA
                    </p>
                  </div>

                  <Button className="text-xl" onClick={handleSubmitOrder}>
                    Confirm Order
                  </Button>
                  {/* <CustomerNameDialog /> */}
                </>
              )}
            </DrawerFooter>
          </div>
        ) : (
          <OrderSuccess
            orderNumber="123456"
            setIsOrderSubmitted={setIsOrderSubmitted}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
