"use client";

import { useState } from "react";
import { toast } from "sonner";
import { OrderItem, useOrderStore } from "@/stores/order.store";
import submitOrder from "@/actions/submit-order";
import { cn } from "@/lib/utils";

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
import { Receipt } from "lucide-react";

const OrderDrawer = ({ table_number }: { table_number: number }) => {
  const { orderItems } = useOrderStore();
  const [orderStatus, setOrderStatus] = useState<
    "Submitted" | "Viewed" | "Not Submitted"
  >("Not Submitted");
  const [orderResponse, setOrderResponse] = useState({} as any);
  const [showCustomerNameInput, setShowCustomerNameInput] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const total = orderItems.reduce(
    (acc: number, item: OrderItem) => acc + item.menuItemPrice * item.quantity,
    0
  );

  const handleOrderCancle = async () => {
    console.log("Order Cancelled");
  };

  const handleSubmitOrder = async () => {
    if (!showCustomerNameInput) {
      setShowCustomerNameInput(true);
      return;
    }

    const order = {
      customer_name: customerName.trim() || "Anonymous",
      table_number: table_number,
      order_items: orderItems.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        note: item.note,
        status: "PENDING",
      })),
    };

    const response = await submitOrder(order);

    if (response.success) {
      setOrderStatus("Submitted");
      setOrderResponse({
        order_id: response.data.order_id,
        customer_name: response.data.customer_name,
      });
      toast.success("Order submitted successfully", { duration: 1000 });
    } else {
      setOrderStatus("Not Submitted");
      setOrderResponse({} as any);
      toast.error("Failed to submit order", { duration: 1000 });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div
          className={cn(
            orderItems.length === 0 ? "hidden" : "w-full flex gap-4"
          )}
        >
          <div className="flex bg-white justify-center font-semibold text-lg items-center gap-2 basis-1/3 border-dotted rounded-sm border-gray-700">
            <Receipt />
            {total} DA
          </div>
          <Button
            className={cn(
              orderItems.length === 0 ? "hidden" : "",
              "basis-2/3 w-full text-xl"
            )}
          >
            Check order
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent
        className={orderStatus === "Submitted" ? "h-screen" : "h-auto pb-8"}
      >
        {orderStatus === "Not Submitted" || orderStatus === "Viewed" ? (
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
                  {orderStatus === "Viewed" ? (
                    <div className="flex gap-2 w-full">
                      <Button
                        variant={"destructive"}
                        onClick={handleOrderCancle}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant={"outline"}
                        className="bg-green-600 text-lg w-full text-white"
                        onClick={() => setOrderStatus("Submitted")}
                      >
                        View Order Number
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div
                        className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${
                          showCustomerNameInput
                            ? "w-1/2 opacity-100"
                            : "w-0 opacity-0"
                        }
                      `}
                      >
                        <Input
                          id="customer_name"
                          name="customer_name"
                          type="text"
                          placeholder="Your name (optional)"
                          className="w-full p-2 border text-lg border-gray-300 rounded-md"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                      <Button
                        className={`text-xl transition-all duration-300 ease-in-out ${
                          showCustomerNameInput ? "w-1/2" : "w-full"
                        }`}
                        onClick={handleSubmitOrder}
                      >
                        {showCustomerNameInput
                          ? "Confirm Order"
                          : "Review Order"}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </DrawerFooter>
          </div>
        ) : (
          <OrderSuccess
            orderNumber={orderResponse.order_id}
            customer_name={orderResponse.customer_name}
            setOrderStatus={setOrderStatus}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
