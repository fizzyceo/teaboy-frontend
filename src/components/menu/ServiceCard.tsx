import { Badge } from "@/components/ui/badge";
import Image from "next/legacy/image";
import { Button } from "../ui/button";
import { ShoppingBasket, CheckCircle, Loader2 } from "lucide-react";
import { translateString } from "@/lib/translate";
import { Order, SpaceOrder } from "@/stores/order.store";
import { themeToCSS } from "@/lib/themeToCSS";

const ServiceCard = ({
  item,
  lang,
  currency,
  VAT,
  base_url,
  isOrdered,
  order_number,
  order_status,
  theme,
  orderButtonState,
}: {
  item: any;
  lang: any;
  currency?: string;
  VAT?: number;
  base_url?: string;
  isOrdered?: boolean;
  order_number?: string;
  order_status: string;
  theme?: string;
  orderButtonState?: boolean;
}) => {
  const handleNavigateToOrder = () => {
    // if (order_number) {
    //   window.location.href = `/order/${order_number}`;
    // }
  };

  return (
    <div
      style={theme ? themeToCSS(theme) : undefined}
      key={item.item_id}
      className={`flex flex-col justify-between gap-4 rounded-md border-2 ${orderButtonState ? "border-4 border-green-600" : "border-slate-300"} ${theme ? `bg-[${theme}]` : "bg-gradient-to-tr from-slate-50 to-slate-400"} p-3 shadow-md md:flex-row lg:flex-row`}
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
          variant={orderButtonState ? "nextStep" : "secondary"}
          className={`flex w-full items-center justify-center border font-semibold ${
            orderButtonState ? "bg-green-500 text-white" : "border-orange-600"
          }`}
          onClick={orderButtonState ? handleNavigateToOrder : undefined}
          disabled={!item.available || orderButtonState}
        >
          {orderButtonState ? (
            order_status ? (
              <>
                <CheckCircle size={24} className="mr-2" />
                <span>{translateString(order_status, lang)}</span>
              </>
            ) : (
              <>
                <Loader2 className="w-7 animate-spin" />
                {/* <span>Loading...</span> */}
              </>
            )
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
