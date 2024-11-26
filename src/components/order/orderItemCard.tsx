"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";
import { useMenuStore } from "@/stores/menu.store";

const OrderItemCard = ({ lang, item }: { lang: string; item: any }) => {
  const { removeOrderItem, orderStatus } = useOrderStore();
  const { menu } = useMenuStore();

  if (!menu) {
    return null;
  }

  const menuItem = menu.menu_items.find(
    (menuItem) => menuItem.item_id === item.menuItemId,
  );

  const { choices } = item;

  const getOrderOptionName = (optionId: number) => {
    const option = menuItem?.options.find(
      (option) => option.menu_item_option_id === optionId,
    );
    let name =
      lang === "ar" && option?.name_ar ? option?.name_ar : option?.name;

    return name;
  };

  const getOrderChoiceName = (choiceId: number, optionId: number) => {
    const option = menuItem?.options.find(
      (option) => option.menu_item_option_id === optionId,
    );
    const choice = option?.choices.find(
      (choice) => choice.choice_id === choiceId,
    );
    let name =
      lang === "ar" && choice?.name_ar ? choice?.name_ar : choice?.name;

    return choice?.name;
  };

  return (
    <div
      key={item.menuItemId}
      className="flex h-auto max-h-36 min-h-28 snap-start items-center gap-4 rounded-lg bg-slate-100 p-3 shadow-lg"
    >
      <div className="flex w-1/2 flex-1 items-center">
        <div className="flex flex-col items-start justify-between gap-1">
          <p className="overflow-hidden text-wrap text-left text-xl font-semibold">
            {lang === "ar" && item.menuItemTitleAR
              ? item.menuItemTitleAR
              : item.menuItemTitle}
          </p>
          <div className="w-1/2 overflow-hidden">
            {item.note && (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
                {item.note}
              </p>
            )}
          </div>

          {choices.map((choice: any) => (
            <p
              key={`${choice.choice_id}-${choice.menu_item_option_id}`}
              className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600 md:text-lg lg:text-lg"
            >
              <span className="font-semibold">
                {getOrderOptionName(choice.menu_item_option_id)}:{" "}
              </span>
              {getOrderChoiceName(choice.choice_id, choice.menu_item_option_id)}
            </p>
          ))}
        </div>
      </div>

      <div className="relative flex h-full w-[45%] flex-col gap-2 md:w-2/5 lg:w-2/5">
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
              {item.menuItemPrice}
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
