"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";
import EditOrderItemDrawer from "./EditOrderItemDrawer";
import { useMenuStore } from "@/stores/menu.store";

const OrderItemCard = (item: any) => {
  const { removeOrderItem, orderStatus } = useOrderStore();
  const { menuItems } = useMenuStore();

  const menuItem = menuItems.find(
    (menuItem) => menuItem.menu_item_id === item.menuItemId,
  );

  const { choices } = item;

  const getOrderOptionName = (optionId: number) => {
    const option = menuItem?.options.find(
      (option) => option.menu_item_option_id === optionId,
    );
    return option?.name;
  };

  const getOrderChoiceName = (choiceId: number, optionId: number) => {
    const option = menuItem?.options.find(
      (option) => option.menu_item_option_id === optionId,
    );
    const choice = option?.choices.find(
      (choice) => choice.menu_item_option_choice_id === choiceId,
    );
    return choice?.name;
  };

  return (
    <div
      key={item.menuItemId}
      className="flex h-auto max-h-36 min-h-28 snap-start items-center gap-4 rounded-lg bg-slate-100 p-3 shadow-lg"
    >
      <div className="flex w-2/5 items-center">
        <div className="flex flex-col items-start justify-between gap-1">
          <p className="overflow-hidden text-wrap text-left text-xl font-semibold">
            {item.menuItemTitle}
          </p>
          {item.note !== "" && (
            <p className="overflow-hidden truncate text-sm text-gray-600">
              {item.note}
            </p>
          )}
          {choices.map((choice: any) => {
            return (
              <p
                key={`${choice.menu_item_option_choice_id}-${choice.menu_item_option_id}`}
                className="overflow-hidden truncate text-sm text-gray-600"
              >
                <span className="font-semibold">
                  {getOrderOptionName(choice.menu_item_option_id)}:{" "}
                </span>
                {getOrderChoiceName(
                  choice.menu_item_option_choice_id,
                  choice.menu_item_option_id,
                )}
              </p>
            );
          })}
        </div>
      </div>

      <div className="relative flex h-full w-3/5 flex-col gap-2">
        <Image
          src={item.menuItemUrl}
          alt={item.menuItemTitle}
          width={100}
          height={50}
          className="h-full w-full rounded-md object-cover"
        />
        <div className="absolute bottom-1 left-1 rounded-md bg-white bg-opacity-75 px-1">
          {item.menuItemPrice !== 0 && (
            <p className="overflow-hidden text-sm font-semibold text-gray-800">
              {item.menuItemPrice} DA
            </p>
          )}
        </div>
        {orderStatus !== "Submitted" && orderStatus !== "Viewed" && (
          <div className="absolute bottom-[-6px] right-[-6px]">
            <Button
              variant="destructive"
              className="size-8 rounded-3xl border-4 border-slate-100 p-0"
              onClick={() => removeOrderItem(item.identifier)}
            >
              <X size={24} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
