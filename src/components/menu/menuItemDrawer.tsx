"use client";
import { useEffect, useState } from "react";
import { SpaceOrder, useOrderStore } from "@/stores/order.store";

import { toast } from "sonner";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import MenuItemCard from "./menuItemCard";

import MenuItemDetails from "./DialogContent/menuItemDetails";
import OrderItemsDetails from "./DialogContent/orderItemsDetails";
import ExtraInfoForm from "./DialogContent/extraInfoForm";
import submitOrder from "@/actions/order/submit-order";
import { useMenuStore } from "@/stores/menu.store";
import { translateString } from "@/lib/translate";

type OrderOptionType = {
  choice_id: number;
  menu_item_option_id: number;
};

const MenuItemDrawer = ({
  item,
  lang,
  currency,
  VAT,
  base_url,
  isOrdered,
  order_number,
  order,
  theme,
}: {
  item: any;
  lang: any;
  currency?: string;
  VAT?: number;
  base_url?: string;
  isOrdered?: boolean;
  order_number?: string;
  order?: SpaceOrder | undefined | false;
  theme?: string;
}) => {
  const [orderOptions, setOrderOptions] = useState<OrderOptionType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
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
    spaceId,
    orderLoading,
    setOrderLoading,
    answer,
  } = useOrderStore();

  const { isOpen } = useMenuStore();

  useEffect(() => {
    const initialOrderOptions = item.options.map((option: any) => ({
      menu_item_option_id: option.menu_item_option_id,
      choice_id: option.default_choice_id,
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
        { menu_item_option_id: optionId, choice_id: choiceId },
      ];
    });
  };

  const handleAddToOrder = () => {
    if (stepIndex === 0) {
      const orderItem = {
        identifier: orderItems.length + 1,
        note,
        choices: orderOptions,
        menuItemId: item.item_id,
        menuItemUrl: base_url + item.images[0],
        menuItemTitle: item.title,
        menuItemTitleAR: item?.title_ar,
        menuItemDescription: item.description,
        menuItemPrice: item.price,
      };

      addOrderItem(orderItem);
    } else if (stepIndex === 2) {
      const handleSubmitOrder = async () => {
        const order = {
          customer_name: customerName || answer || "Anonymous",
          table_number: tableNumber,
          spaceId: spaceId,
          answer: answer,
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

        setOrderLoading(true);
        const response = await submitOrder(order);
        setOrderLoading(false);

        if (response.success) {
          setOrderStatus("Submitted");
          setOrderNumber(response.data.order_number);
          toast.success(
            `${translateString("Order submitted successfully", lang)}`,
            { duration: 1000 },
          );
        } else {
          setOrderStatus("Not Submitted");
          toast.error(`${translateString("Failed to submit order", lang)}`, {
            duration: 1000,
          });
        }
      };

      handleSubmitOrder();
    }

    setStepIndex((prevIndex) => prevIndex + 1);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogOpen = () => {
    setStepIndex(0);
    setOpenDialog(true);
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
      <DialogTrigger
        disabled={orderStatus !== "Not Submitted" || !isOpen || !item.available}
      >
        <MenuItemCard
          currency={currency}
          VAT={VAT}
          base_url={base_url}
          lang={lang}
          item={item}
        />
      </DialogTrigger>

      <DialogContent>
        {stepIndex === 0 && orderStatus === "Not Submitted" ? (
          <MenuItemDetails
            currency={currency}
            VAT={VAT}
            base_url={base_url}
            lang={lang}
            item={item}
            note={note}
            setNote={setNote}
            handleValueChange={handleValueChange}
            handleNext={handleAddToOrder}
          />
        ) : stepIndex === 1 && orderStatus === "Not Submitted" ? (
          <OrderItemsDetails
            currency={currency}
            lang={lang}
            handleNext={handleAddToOrder}
          />
        ) : (
          <ExtraInfoForm lang={lang} handleNext={handleAddToOrder} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDrawer;
