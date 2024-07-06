"use client";

import Image from "next/image";
import { MinusSquare, PlusSquare } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { OrderItem, useOrderStore } from "@/stores/order.store";
import submitOrder from "@/actions/submit-order";
import { toast } from "sonner";

const OrderDrawer = () => {
  const { orderItems, setQuantity, removeOrderItem } = useOrderStore();

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
    const response = await submitOrder(order);
    console.log(response);
    if (response.success) {
      toast.success("Order submitted successfully");
    } else {
      toast.error("Failed to submit order");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full text-xl">Check order</Button>
      </DrawerTrigger>

      <DrawerContent className="h-auto">
        <DrawerHeader>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-scroll no-scrollbar snap-y w-full">
            {orderItems.map((item: OrderItem) => (
              <div
                key={item.menuItemId}
                className="flex gap-4 p-4 snap-start bg-slate-100 rounded-md shadow-lg"
              >
                <Image
                  src={item.menuItemUrl}
                  alt={item.menuItemTitle}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
                <div className="flex justify-between w-full">
                  <div className="flex items-start flex-col gap-1">
                    <p className="text-lg font-semibold truncate">
                      {item.menuItemTitle}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {item.note}
                    </p>
                    <p className="text-md font-medium text-gray-800">
                      {item.menuItemPrice} DA
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 justify-center items-center w-2/5">
                    <div className="flex gap-4 justify-center items-center w-full">
                      <MinusSquare
                        onClick={() =>
                          setQuantity(item.menuItemId, item.quantity - 1)
                        }
                      />
                      <div className="text-2xl font-bold">{item.quantity}</div>
                      <PlusSquare
                        onClick={() =>
                          setQuantity(item.menuItemId, item.quantity + 1)
                        }
                      />
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => removeOrderItem(item.menuItemId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col gap-4 w-full px-4 py-2">
          {total > 0 && (
            <div className="flex justify-center px-4 py-2 bg-slate-200 rounded-md shadow-lg">
              <p className="text-xl">
                Total Price: <span className="font-bold">{total}</span> DA
              </p>
            </div>
          )}
          <Button className="text-xl" onClick={handleSubmitOrder}>
            Confirm Order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
