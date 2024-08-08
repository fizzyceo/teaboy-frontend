import { Edit, MinusSquare, PlusSquare, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";
import EditOrderItemDrawer from "./EditOrderItemDrawer";

const OrderItemCard = (item: any) => {
  const { removeOrderItem } = useOrderStore();
  return (
    <div
      key={item.menuItemId}
      className="flex h-28 snap-start gap-4 rounded-md bg-slate-100 p-4 shadow-lg"
    >
      <div className="flex h-full w-2/5 flex-col gap-2">
        <Image
          src={item.menuItemUrl}
          alt={item.menuItemTitle}
          width={80}
          height={20}
          className="h-24 w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-2/5 items-center">
        <div className="flex flex-col items-start justify-between gap-1">
          <p className="overflow-hidden text-wrap text-2xl font-semibold">
            {item.menuItemTitle}
          </p>
          {item.note !== "" && (
            <p className="overflow-hidden truncate text-sm text-gray-600">
              {item.note}
            </p>
          )}
          {item.menuItemPrice !== 0 && (
            <p className="overflow-hidden text-xl font-medium text-gray-800">
              {item.menuItemPrice} DA
            </p>
          )}
        </div>
      </div>
      <div className="flex w-1/5 flex-col items-center justify-center gap-2">
        <Button
          variant="destructive"
          className="size-11 rounded-xl p-0"
          onClick={() => removeOrderItem(item.identifier)}
        >
          <Trash size={24} />
        </Button>
        <EditOrderItemDrawer {...item} />
      </div>
    </div>
  );
};

export default OrderItemCard;
