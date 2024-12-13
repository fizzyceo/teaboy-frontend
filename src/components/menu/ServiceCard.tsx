import { Badge } from "@/components/ui/badge";
import Image from "next/legacy/image";
import { Button } from "../ui/button";
import { ShoppingBasket, CheckCircle } from "lucide-react";
import { translateString } from "@/lib/translate";

const ServiceCard = ({
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
  const handleNavigateToOrder = () => {
    if (order_number) {
      window.location.href = `/order/${order_number}`;
    }
  };

  return (
    <div
      key={item.item_id}
      className="flex flex-col justify-between gap-4 rounded-md border-2 border-slate-300 bg-gradient-to-tr from-slate-100 to-slate-200 p-3 shadow-md md:flex-row lg:flex-row"
    >
      <div className="relative h-40 w-full rounded-md bg-slate-500 sm:h-20 md:h-32 lg:h-36">
        <Image
          src={base_url + "" + item.images[0]}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          unoptimized
        />
        {!item.available && (
          <Badge variant={"destructive"} className="absolute bottom-2 right-2">
            {translateString("Out of Stock", lang)}
          </Badge>
        )}
      </div>

      <div className="flex w-full flex-col justify-between gap-4 md:w-2/5 lg:w-2/5">
        <div className="flex w-full flex-col justify-between">
          <h2 className="text-ellipsis text-lg font-bold">
            {lang === "ar" && item.title_ar ? item.title_ar : item.title}
          </h2>
        </div>
        <Button
          variant={isOrdered || order_number ? "nextStep" : "secondary"}
          className={`flex w-full items-center justify-center border font-semibold ${
            isOrdered || order_number
              ? "bg-green-500 text-white"
              : "border-orange-600"
          }`}
          onClick={
            isOrdered || order_number ? handleNavigateToOrder : undefined
          }
          disabled={!item.available || isOrdered}
        >
          {isOrdered || order_number ? (
            <>
              <CheckCircle size={24} className="mr-2" />
              <span>{translateString("Ordered", lang)}</span>
            </>
          ) : (
            <>
              <ShoppingBasket size={24} className="mr-2" />
              <span>{translateString("Order Now", lang)}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;