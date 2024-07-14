import { Edit, MinusSquare, PlusSquare, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";

const OrderItemCard = (item: any) => {
  const { removeOrderItem } = useOrderStore();
  return (
    <div
      key={item.menuItemId}
      className="flex gap-4 p-4 snap-start bg-slate-100 rounded-md shadow-lg"
    >
      <div className="flex flex-col gap-2 w-2/5 h-full">
        <Image
          src={item.menuItemUrl}
          alt={item.menuItemTitle}
          width={80}
          height={20}
          className="object-cover rounded-md w-full h-24"
        />
      </div>
      <div className="flex w-2/5 ">
        <div className="flex items-start  justify-between flex-col gap-1">
          <p className="text-2xl font-semibold  overflow-hidden truncate">
            {item.menuItemTitle}
          </p>
          {item.note !== "" && (
            <p className="text-sm text-gray-600 overflow-hidden truncate">
              {item.note}
            </p>
          )}
          <p className="text-xl font-medium overflow-hidden text-gray-800">
            {item.menuItemPrice} DA
          </p>
        </div>
      </div>
      <div className="flex w-1/5 flex-col gap-2 justify-center items-center  ">
        <Button
          variant="destructive"
          className="p-0 size-11 rounded-xl"
          onClick={() => removeOrderItem(item.menuItemId)}
        >
          <Trash size={24} />
        </Button>
        <Button className="p-0 size-11 rounded-xl">
          <Edit size={24} />
        </Button>
      </div>
    </div>
  );
};

export default OrderItemCard;
