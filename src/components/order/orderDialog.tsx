import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { OrderItem, useOrderStore } from "@/stores/order.store";
import submitOrder from "@/actions/order/submit-order";

import {
  PackageCheck,
  Receipt,
  ReceiptText,
  Send,
  ShoppingCart,
  Tag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import OrderItemCard from "./orderItemCard";
import OrderSuccess from "./orderSuccess";

const OrderDialog = ({ table_number }: { table_number: number }) => {
  const {
    orderItems,
    orderStatus,
    customerName,
    setCustomerName,
    setOrderStatus,
    setOrderNumber,
  } = useOrderStore();

  const [stepIndex, setStepIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const total = orderItems.reduce(
    (acc: number, item: OrderItem) => acc + item.menuItemPrice,
    0,
  );

  useEffect(() => {
    setStepIndex(0);
  }, [openDialog]);

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) {
      toast.error("Please add items to order", { duration: 1000 });
      return;
    }

    if (orderStatus === "Submitted" || orderStatus === "Viewed") {
      setStepIndex(2);
    } else {
      // orderStatus === "Not Submitted"
      if (stepIndex === 0) {
        // orderItems list
        setStepIndex(1);
      } else if (stepIndex === 1) {
        // Customer Input his name and submit order
        const order = {
          customer_name: customerName || "Anonymous",
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
          setCustomerName(response.data.customer_name);
          setOrderNumber(response.data.order_number);
          toast.success("Order submitted successfully", { duration: 1500 });
        } else {
          setOrderStatus("Not Submitted");
          toast.error("Failed to submit order", { duration: 1500 });
        }
        setStepIndex(2);
      }
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div
          className={cn(
            orderItems.length === 0 ? "hidden" : "flex w-full gap-4",
          )}
        >
          {total > 0 && (
            <div className="flex w-2/3 items-center justify-center gap-2 rounded-sm border-dotted border-gray-700 bg-white text-lg font-semibold">
              <Receipt />
              {total} DA
            </div>
          )}
          <Button
            className={cn(
              orderItems.length === 0 ? "hidden" : "",
              "flex h-12 w-full items-center justify-center gap-4 rounded-3xl py-6 text-xl",
            )}
            variant={orderStatus === "Not Submitted" ? "sendOrder" : "nextStep"}
          >
            <span>
              {orderStatus === "Not Submitted" ? "My Cart" : "Review Order"}
            </span>
            {orderStatus === "Not Submitted" ? (
              <ShoppingCart />
            ) : (
              <ReceiptText />
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        className={
          stepIndex === 2
            ? "mt-16 h-screen bg-gradient-to-b from-green-500 via-green-500 to-green-600"
            : "h-auto"
        }
      >
        {stepIndex === 2 ? (
          <OrderSuccess stepIndex={stepIndex} setStepIndex={setStepIndex} />
        ) : (
          <>
            {stepIndex === 0 && openDialog ? (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {orderItems.length > 0
                      ? "Order Details"
                      : "Basket is Empty"}
                  </DialogTitle>
                </DialogHeader>

                <div className="no-scrollbar flex max-h-[40vh] w-full snap-y flex-col gap-3 overflow-scroll">
                  {orderItems.map((item: OrderItem) => (
                    <OrderItemCard {...item} key={item.menuItemId} />
                  ))}
                </div>

                <DialogFooter>
                  {orderItems.length === 0 ? (
                    <DialogTrigger asChild>
                      <Button className="w-full text-xl">Add Items</Button>
                    </DialogTrigger>
                  ) : (
                    <>
                      <Button
                        onClick={handleSubmitOrder}
                        className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl text-black"
                        variant={
                          orderStatus === "Not Submitted"
                            ? "nextStep"
                            : "sendOrder"
                        }
                      >
                        <span>
                          {orderStatus === "Not Submitted"
                            ? "Submit Order"
                            : "Order Number"}
                        </span>
                        {orderStatus === "Not Submitted" ? (
                          <PackageCheck />
                        ) : (
                          <Tag />
                        )}
                      </Button>
                      {total > 0 && (
                        <div className="flex justify-center rounded-md px-4 py-2">
                          <p className="text-xl font-semibold">
                            <span className="font-bold">
                              Total Price : {total}
                            </span>{" "}
                            <span className="text-sm">$</span>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Enter Your Name
                  </DialogTitle>
                </DialogHeader>

                <Input
                  placeholder="Customer Name"
                  value={customerName}
                  className="text-lg"
                  onChange={(e) => setCustomerName(e.target.value)}
                />

                <DialogFooter>
                  <Button
                    className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl"
                    variant={"nextStep"}
                    onClick={handleSubmitOrder}
                  >
                    <span>Send Order</span>
                    <Send />
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
