import { MapPin, PhoneCall, Utensils } from "lucide-react";
import Image from "next/image";

const RestaurantHeader = ({
  restaurant,
  searchParams,
}: {
  restaurant: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex w-full items-center justify-around gap-4 bg-gradient-to-tr from-slate-50 to-slate-400 py-4 md:justify-between md:px-20 lg:justify-between lg:px-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        {restaurant.address !== " " && (
          <p className="flex items-center gap-4">
            <MapPin size={16} /> {restaurant.address}
          </p>
        )}

        <p className="flex items-center gap-4">
          <PhoneCall size={16} /> {restaurant.phone}
        </p>
        <p className="flex items-center gap-4">
          <Utensils size={16} /> Table N {searchParams.table}
        </p>
      </div>

      <div className="relative h-32 w-32 overflow-hidden rounded-xl">
        <Image
          src={restaurant.image_url}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default RestaurantHeader;
