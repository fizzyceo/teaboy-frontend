import { Home, MapPin, PhoneCall, Utensils } from "lucide-react";
import Image from "next/image";

const SiteHeader = ({ space }: { space: any }) => {
  const { site } = space;
  return (
    <div className="flex w-full items-center justify-around gap-4 bg-gradient-to-tr from-slate-50 to-slate-400 py-4 md:justify-between md:px-20 lg:justify-between lg:px-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{site.name}</h1>
        {site.address !== " " && (
          <p className="flex items-center gap-4">
            <MapPin size={16} /> {site.address}
          </p>
        )}

        <p className="flex items-center gap-4">
          <PhoneCall size={16} /> {site.phone}
        </p>
        <p className="flex items-center gap-4">
          <Home size={16} /> Space : {space.name}
        </p>
      </div>

      <div className="relative h-32 w-32 overflow-hidden rounded-xl">
        <Image
          src={site.image_url}
          alt={site.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default SiteHeader;
