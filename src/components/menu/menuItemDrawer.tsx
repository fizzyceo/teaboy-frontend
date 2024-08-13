"use client";
import { useState } from "react";
import { useOrderStore } from "@/stores/order.store";

import { toast } from "sonner";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import MenuItemCard from "./menuItemCard";

import MenuItemDetails from "./DialogContent/menuItemDetails";
import OrderItemsDetails from "./DialogContent/orderItemsDetails";
import ExtraInfoForm from "./DialogContent/extraInfoForm";

type OrderOptionType = {
  menu_item_option_choice_id: number;
  menu_item_option_id: number;
};

const MenuItemDrawer = (item: any) => {
  console.log("item:--->", item);
  const [orderOptions, setOrderOptions] = useState<OrderOptionType[]>([]);
  const [closeDialog, setCloseDialog] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [note, setNote] = useState("");
  const { addOrderItem, orderItems } = useOrderStore();

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
    }

    setStepIndex((prevIndex) => prevIndex + 1);

    // toast.success(`Added  ${item.title} to Cart`, {
    //   duration: 3000,
    // });
  };

  return (
    <Dialog>
      <DialogTrigger>
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
