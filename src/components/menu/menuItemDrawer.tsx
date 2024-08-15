"use client";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/stores/order.store";

import { toast } from "sonner";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import MenuItemCard from "./menuItemCard";

import MenuItemDetails from "./DialogContent/menuItemDetails";
import OrderItemsDetails from "./DialogContent/orderItemsDetails";
import ExtraInfoForm from "./DialogContent/extraInfoForm";
import submitOrder from "@/actions/order/submit-order";

type OrderOptionType = {
  menu_item_option_choice_id: number;
  menu_item_option_id: number;
};

const MenuItemDrawer = (item: any) => {
  const [orderOptions, setOrderOptions] = useState<OrderOptionType[]>([]);

  const [closeDialog, setCloseDialog] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [note, setNote] = useState("");
  const {
    addOrderItem,
    orderItems,
    customerName,
    tableNumber,
    setOrderStatus,
    orderStatus,
    orderNumber,
    setOrderNumber,
  } = useOrderStore();

  useEffect(() => {
    const initialOrderOptions = item.options.map((option: any) => ({
      menu_item_option_id: option.menu_item_option_id,
      menu_item_option_choice_id: option.default_choice_id,
    }));
    setOrderOptions(initialOrderOptions);
  }, [item.options]);

  const handleValueChange = (optionId: number, choiceId: number) => {
    setOrderOptions((prevOptions) => {
      const updatedOptions = prevOptions.filter(
        (opt) => opt.menu_item_option_id !== optionId,
      );
      return [
        ...updatedOptions,
        { menu_item_option_id: optionId, menu_item_option_choice_id: choiceId },
      ];
    });
  };

  const handleAddToOrder = () => {
    if (stepIndex === 0) {
      const orderItem = {
        identifier: orderItems.length + 1,
        note,
        choices: orderOptions,
        menuItemId: item.menu_item_id,
        menuItemUrl: item.item_images[0].image_url,
        menuItemTitle: item.title,
        menuItemDescription: item.description,
        menuItemPrice: item.price,
      };

      addOrderItem(orderItem);
    } else if (stepIndex === 2) {
      const handleSubmitOrder = async () => {
        const order = {
          customer_name: customerName || "Anonymous",
          table_number: tableNumber,
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
          setOrderNumber(response.data.order_number);
          toast.success("Order submitted successfully", { duration: 1000 });
        } else {
          setOrderStatus("Not Submitted");
          toast.error("Failed to submit order", { duration: 1000 });
        }
      };

      handleSubmitOrder();
    }

    setStepIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Dialog onOpenChange={() => setStepIndex(0)}>
      <DialogTrigger disabled={orderStatus !== "Not Submitted"}>
        <MenuItemCard {...item} />
      </DialogTrigger>

      <DialogContent>
        {stepIndex === 0 ? (
          <MenuItemDetails
            item={item}
            note={note}
            setNote={setNote}
            handleValueChange={handleValueChange}
            handleNext={handleAddToOrder}
          />
        ) : stepIndex === 1 ? (
          <OrderItemsDetails handleNext={handleAddToOrder} />
        ) : (
          <ExtraInfoForm handleNext={handleAddToOrder} />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default MenuItemDrawer;
