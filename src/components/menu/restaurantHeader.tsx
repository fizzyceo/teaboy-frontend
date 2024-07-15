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
    <div className="flex gap-4 items-center w-full bg-slate-200 justify-around md:justify-between lg:justify-between md:px-20 lg:px-20 py-4">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        {restaurant.address !== " " && (
          <p className="flex gap-4 items-center">
            <MapPin size={16} /> {restaurant.address}
          </p>
        )}

        <p className="flex gap-4 items-center">
          <PhoneCall size={16} /> {restaurant.phone}
        </p>
        <p className="flex gap-4 items-center">
          <Utensils size={16} /> Table N {searchParams.table}
        </p>
      </div>

      <div className="w-32 h-32 relative rounded-xl overflow-hidden">
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
