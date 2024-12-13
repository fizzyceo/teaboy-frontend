"use client";
import { useState } from "react";
import { useOrderStore } from "@/stores/order.store";

import { toast } from "sonner";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import ServiceCard from "./ServiceCard";
import submitOrder from "@/actions/order/submit-order";
import { translateString } from "@/lib/translate";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ServiceDrawer = ({
  item,
  lang,
  currency,
  VAT,
  base_url,
  isOrdered,
  order_number,
}: {
  item: any;
  lang: any;
  currency?: string;
  VAT?: number;
  base_url?: string;
  isOrdered?: boolean;
  order_number?: string;
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

    console.log("Submitting order:", order);

    setOrderLoading(true);
    const response = await submitOrder(order);
    setOrderLoading(false);

    if (response.success) {
      setOrderStatus("Submitted");
      setOrderNumber(response.data.order_number);
      router.push(`/order/${response.data.order_number}`);
      toast.success(
        `${translateString("Order submitted successfully", lang)}`,
        { duration: 1000 },
      );
      setOpenDialog(false);
    } else {
      setOrderStatus("Not Submitted");
      toast.error(`${translateString("Failed to submit order", lang)}`, {
        duration: 1000,
      });
    }
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleDialogOpen = () => setOpenDialog(true);

  const handleNavigateToOrder = () => {
    if (order_number) {
      router.push(`/order/${order_number}`);
    }
  };

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
          isOrdered={isOrdered}
          order_number={order_number}
          currency={currency}
          VAT={VAT}
          base_url={base_url}
          lang={lang}
          item={item}
        />
      </DialogTrigger>

      <DialogContent>
        <div className="p-4">
          <h2>
            {isOrdered || order_number
              ? translateString("Order", lang)
              : translateString("Confirm Order", lang)}
          </h2>
          <p>
            {isOrdered || order_number
              ? translateString("View order details", lang)
              : translateString(
                  "Are you sure you want to order this item?",
                  lang,
                )}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant={"secondary"}
              className="btn-secondary"
              onClick={handleDialogClose}
              disabled={orderLoading}
            >
              {translateString("Cancel", lang)}
            </Button>
            <Button
              variant={isOrdered || order_number ? "nextStep" : "order"}
              onClick={
                isOrdered || order_number
                  ? handleNavigateToOrder
                  : handleOrderSubmit
              }
              // disabled={isOrdered || orderLoading}
              className={`${
                isOrdered || order_number ? "bg-green-500 text-white" : ""
              }`}
            >
              {isOrdered || order_number ? (
                translateString("View", lang)
              ) : orderLoading ? (
                <Loader2 className="w-7 animate-spin" />
              ) : (
                translateString("Confirm", lang)
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDrawer;
