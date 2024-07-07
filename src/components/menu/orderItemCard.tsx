import { MinusSquare, PlusSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useOrderStore } from "@/stores/order.store";

const OrderItemCard = (item: any) => {
  const { setQuantity, removeOrderItem } = useOrderStore();
  return (
    <div
      key={item.menuItemId}
      className="flex gap-4 p-4 snap-start bg-slate-100 rounded-md shadow-lg"
    >
      <Image
        src={item.menuItemUrl}
        alt={item.menuItemTitle}
        width={80}
        height={80}
        className="object-cover rounded-md basis-1/3"
      />
      <div className="flex justify-between basis-1/3">
        <div className="flex items-start justify-between flex-col gap-1">
          <p className="text-lg font-semibold truncate">{item.menuItemTitle}</p>
          <p className="text-sm text-gray-600 truncate">{item.note}</p>
          <p className="text-md font-medium text-gray-800">
            {item.menuItemPrice} DA
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center basis-1/3">
        <div className="flex gap-4 justify-center items-center w-full">
          <MinusSquare
            onClick={() => {
              setQuantity(item.menuItemId, item.quantity - 1);
              if (item.quantity === 1) {
                removeOrderItem(item.menuItemId);
              }
            }}
          />
          <div className="text-2xl font-bold">{item.quantity}</div>
          <PlusSquare
            onClick={() => setQuantity(item.menuItemId, item.quantity + 1)}
          />
        </div>
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => removeOrderItem(item.menuItemId)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default OrderItemCard;
