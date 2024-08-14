"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";
import EditOrderItemDrawer from "./EditOrderItemDrawer";
import { useMenuStore } from "@/stores/menu.store";

const OrderItemCard = (item: any) => {
  const { removeOrderItem, orderStatus } = useOrderStore();
  const { menu } = useMenuStore();

  if (!menu) {
    return null;
  }

  const menuItem = menu.menu_items.find(
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
      className="flex h-auto max-h-36 min-h-20 snap-start items-center gap-4 rounded-lg bg-slate-100 p-3 shadow-lg"
    >
      <div className="flex flex-1 items-center">
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
                className="overflow-hidden truncate text-sm text-gray-600 md:text-lg lg:text-lg"
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

      <div className="relative flex h-full w-1/2 flex-col gap-2 md:w-1/5 lg:w-1/5">
        <div className="h-24 w-full overflow-hidden rounded-md">
          <Image
            src={item.menuItemUrl}
            alt={item.menuItemTitle}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
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
