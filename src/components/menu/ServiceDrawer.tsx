"use client";
import { useEffect, useState } from "react";
import { SpaceOrder, useOrderStore } from "@/stores/order.store";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ServiceCard from "./ServiceCard";
import submitOrder from "@/actions/order/submit-order";
import { translateString } from "@/lib/translate";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import cancelOrder from "@/actions/order/cancel-order";

const ServiceDrawer = ({
  item,
  lang,
  currency,
  VAT,
  base_url,
  isOrdered,
  order_number,
  order,
  theme,
  resetTimer, // Add resetTimer prop
}: {
  item: any;
  lang: any;
  currency?: string;
  VAT?: number;
  base_url?: string;
  isOrdered?: boolean;
  order_number?: string;
  order?: SpaceOrder | undefined | false;
  theme: string;
  resetTimer: () => void; // Define the type
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const {
    customerName,
    tableNumber,
    setOrderStatus,
    setOrderNumber,
    spaceId,
    setOrderLoading,
    orderLoading,
  } = useOrderStore();
  const [status, setStatus] = useState<string>("");
  const [order_id, setOrder_id] = useState<string>("");
  const [itemImage, setItemImage] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemTitle, setItemTitle] = useState<string>("");
  const [onCanceling, setOnCanceling] = useState<boolean>(false);

  const [orderButtonState, setOrderButtonState] = useState<boolean>(false);

  const handleCancelOrder = async () => {
    if (order) {
      setOnCanceling(true);
      const response = await cancelOrder(order.order_id);
      setOnCanceling(false);
      if (response.success) {
        toast.info(`${translateString("Order canceled successfully", lang)}`, {
          duration: 1000,
        });
        setOpenDialog(false);

        //change state to not ordered
        setOrderButtonState(false);
      } else {
        toast.error(`${translateString("Failed to cancel order", lang)}`, {
          duration: 1000,
        });
      }
    }
  };
  const handleOrderSubmit = async () => {
    if (isOrdered || order_number) return; // Prevent submission if already ordered

    const order = {
      customer_name: customerName || "Anonymous",
      table_number: tableNumber,
      spaceId: spaceId,
      order_items: [
        {
          menu_item_id: item.item_id,
          quantity: 1,
          note: "",
          status: "PENDING",
          choices: [],
        },
      ],
    };

    setOrderLoading(true);
    const response = await submitOrder(order);
    setOrderLoading(false);

    if (response.success) {
      setOrderStatus("Submitted");
      setOrderNumber(response.data.order_number);
      // router.push(`/order/${response.data.order_number}`);
      toast.success(
        `${translateString("Order submitted successfully", lang)}`,
        { duration: 1000 },
      );
      setOpenDialog(false);
      //change state to ordered
      setOrderButtonState(true);
    } else {
      setOrderStatus("Not Submitted");
      toast.error(`${translateString("Failed to submit order", lang)}`, {
        duration: 1000,
      });
    }
  };

  const handleDialogClose = () => {
    resetTimer(); // Call resetTimer
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    resetTimer(); // Call resetTimer
    setOpenDialog(true);
  };

  const viewDetails = () => {
    if (order_number) {
      console.log(order);

      // router.push(`/order/${order_number}`);
    }
  };

  useEffect(() => {
    if (isOrdered || order_number) {
      setOrderButtonState(true);
    }
  }, [isOrdered, order_number]);

  useEffect(() => {
    if (order) {
      if (order.status === "PENDING") {
        setStatus("Received");
      } else if (order.status === "IN_PROGRESS" || order.status === "READY") {
        setStatus("On The Way");
      } else {
        setStatus("");
      }
      setOrder_id(order.order.order_number);
      setItemImage(order.menu_item.item_images[0].image_url);
      setItemDescription(order.menu_item.description);
      setItemTitle(order.menu_item.title);
    }
  }, [order]);
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          handleDialogOpen();
        } else {
          handleDialogClose();
        }
      }}
    >
      <DialogTrigger disabled={!item.available}>
        <ServiceCard
          theme={theme}
          isOrdered={isOrdered}
          order_number={order_number}
          orderButtonState={orderButtonState}
          order_status={status}
          currency={currency}
          VAT={VAT}
          base_url={base_url}
          lang={lang}
          item={item}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogTitle></DialogTitle>
        <div className="space-y-3 p-4">
          <h2 className="text-xl font-medium underline">
            {orderButtonState
              ? translateString("Order Information", lang)
              : translateString("Confirm Order", lang)}{" "}
            ({itemTitle})
          </h2>
          <p>
            {orderButtonState
              ? ""
              : translateString(
                  "Are you sure you want to order this service?",
                  lang,
                )}
          </p>
          {isOrdered && (
            <div className="space-y-3">
              <h1 className="">
                ORDER#<strong className="text-green-700">{order_id}</strong>
              </h1>
              <h1>
                STATUS: <strong className="text-green-700">{status}</strong>
              </h1>
              {/* <div className="flex flex-row gap-3 rounded-md bg-slate-200 p-2">
                <img
                  className="rounded-md"
                  src={itemImage}
                  width={200}
                  alt=""
                />

                <div className="flex flex-col items-start text-sm">
                  <h2>
                    <strong>{translateString("Title", lang)}:</strong>{" "}
                    {itemTitle}
                  </h2>
                  {itemDescription && (
                    <p>
                      <strong>{translateString("Description", lang)}: </strong>
                      {itemDescription}
                    </p>
                  )}
                </div>
              </div> */}
            </div>
          )}
          <div className="mt-4 flex justify-end gap-2">
            {/**only allow the user to cancel if there's an order and if the order is not being fullfilled yet */}
            {isOrdered && status.toLowerCase() === "received" && (
              <Button
                variant={"destructive"}
                className="btn-secondary"
                onClick={handleCancelOrder}
                disabled={orderLoading || onCanceling}
              >
                {onCanceling ? (
                  <Loader2 className="w-7 animate-spin" />
                ) : (
                  translateString("Cancel Order", lang)
                )}
              </Button>
            )}

            {!isOrdered && !order_number && (
              <Button
                variant={"destructive"}
                className="btn-secondary"
                onClick={handleDialogClose}
                // disabled={orderLoading || onCanceling}
              >
                {translateString("Cancel", lang)}
              </Button>
            )}
            <Button
              variant={"nextStep"}
              onClick={orderButtonState ? handleDialogClose : handleOrderSubmit}
              // disabled={isOrdered || orderLoading}
              className={`bg-green-500 text-white`}
              disabled={orderLoading || onCanceling}
            >
              {orderButtonState ? (
                translateString("OK", lang)
              ) : orderLoading ? (
                <Loader2 className="w-7 animate-spin" />
              ) : (
                translateString("Submit", lang)
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDrawer;
