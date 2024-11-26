import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { OrderItem, useOrderStore } from "@/stores/order.store";
import submitOrder from "@/actions/order/submit-order";

import {
  Loader2,
  PackageCheck,
  Receipt,
  ReceiptText,
  Send,
  ShoppingCart,
  SquarePlus,
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
import OrderItemList from "./orderItemList";
import { translateString } from "@/lib/translate";

const OrderDialog = ({
  table_number,
  lang,
  currency,
  VAT,
  base_url,
}: {
  table_number: number;
  lang: any;
  currency?: string;
  VAT?: number;
  base_url?: string;
}) => {
  const {
    orderItems,
    orderStatus,
    customerName,
    setCustomerName,
    setOrderStatus,
    setOrderNumber,
    setOrderLoading,
    orderLoading,
    spaceId,
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
      if (stepIndex === 0) {
        setStepIndex(1);
      } else if (stepIndex === 1) {
        console.log(orderItems);

        const order = {
          customer_name: customerName || "Anonymous",
          table_number: table_number || 0,
          spaceId: spaceId,
          order_items: orderItems.map((item) => ({
            menu_item_id: item.menuItemId,
            quantity: 1,
            note: item.note,
            status: "PENDING",
            choices: item.choices?.map((choice) => ({
              menu_item_option_choice_id: choice.choice_id,
            })),
          })),
        };
        console.log(order);

        setOrderLoading(true);
        const response = await submitOrder(order);
        setOrderLoading(false);

        if (response.success) {
          setOrderStatus("Submitted");
          setCustomerName(response.data.customer_name);
          setOrderNumber(response.data.order_number);
          toast.success(
            `${translateString("Order submitted successfully", lang)}`,
            { duration: 1500 },
          );
        } else {
          setOrderStatus("Not Submitted");
          toast.error(`${translateString("Failed to submit order", lang)}`, {
            duration: 1500,
          });
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
            disabled={orderLoading}
            variant={orderStatus === "Not Submitted" ? "sendOrder" : "nextStep"}
          >
            {orderLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" /> {/* Loader component */}
              </div>
            ) : (
              <>
                <span>
                  {orderStatus === "Not Submitted"
                    ? translateString("My Cart", lang)
                    : translateString("Review Order", lang)}
                </span>
                {orderStatus === "Not Submitted" ? (
                  <ShoppingCart />
                ) : (
                  <ReceiptText />
                )}
              </>
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        className={
          stepIndex === 2
            ? "mt-16 h-screen bg-green-500 bg-gradient-to-b landscape:mt-0 landscape:h-auto landscape:py-10"
            : "h-auto"
        }
      >
        {stepIndex === 2 ? (
          <OrderSuccess
            lang={lang}
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
          />
        ) : (
          <>
            {stepIndex === 0 && openDialog ? (
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
                  {orderItems.length === 0 ? (
                    <DialogTrigger asChild>
                      <Button
                        className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl"
                        variant={"nextStep"}
                      >
                        <span>{translateString("Add Items", lang)}</span>
                        <SquarePlus />
                      </Button>
                    </DialogTrigger>
                  ) : (
                    <>
                      <Button
                        onClick={handleSubmitOrder}
                        disabled={orderLoading}
                        className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl"
                        variant={
                          orderStatus === "Not Submitted"
                            ? "nextStep"
                            : "sendOrder"
                        }
                      >
                        {orderLoading ? (
                          <div className="flex h-full items-center justify-center">
                            <Loader2 className="animate-spin" />{" "}
                            {/* Loader component */}
                          </div>
                        ) : (
                          <>
                            <span>
                              {orderStatus === "Not Submitted"
                                ? translateString("Submit Order", lang)
                                : translateString("Order Number", lang)}
                            </span>
                            {orderStatus === "Not Submitted" ? (
                              <PackageCheck />
                            ) : (
                              <Tag />
                            )}
                          </>
                        )}
                      </Button>
                      {total > 0 && (
                        <div className="flex justify-center rounded-md px-4 py-2">
                          <p className="text-xl font-semibold">
                            <span className="font-bold">
                              {translateString("Total Price", lang)} : {total}
                            </span>{" "}
                            <span className="text-sm">{currency}</span>
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
                    {translateString("Enter Your Name", lang)}
                  </DialogTitle>
                </DialogHeader>

                <Input
                  placeholder={`${translateString("Customer Name", lang)}`}
                  value={customerName}
                  className="text-lg"
                  onChange={(e) => setCustomerName(e.target.value)}
                />

                <DialogFooter>
                  <Button
                    className="flex h-12 w-full items-center justify-center gap-4 py-6 text-xl"
                    variant={"nextStep"}
                    onClick={handleSubmitOrder}
                    disabled={orderLoading}
                  >
                    {orderLoading ? (
                      <div className="flex h-full items-center justify-center">
                        <Loader2 className="animate-spin" />{" "}
                        {/* Loader component */}
                      </div>
                    ) : (
                      <>
                        <span>{translateString("Send Order", lang)}</span>
                        <Send />
                      </>
                    )}
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
