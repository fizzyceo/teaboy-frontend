import { themeToCSS } from "@/lib/themeToCSS";
import { Home, MapPin, PhoneCall, Utensils } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";

const SiteHeader = ({ space, lang }: { space: any; lang: string }) => {
  const { site, theme } = space;

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "beach":
        return <LiaUmbrellaBeachSolid size={16} />;

      // return <Image src={sunbed} alt="Sunbed" width={16} height={16} />;
      default:
        return <Home size={16} />;
    }
  };
  return (
    <div
      style={theme ? themeToCSS(theme) : undefined}
      className="flex w-full items-center justify-around gap-4 bg-gradient-to-tr from-slate-50 to-slate-400 py-4 md:justify-between md:px-20 lg:justify-between lg:px-20"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          {space.default_lang === "AR" && site.name_ar
            ? site.name_ar
            : site.name}
        </h1>
        {site.address !== " " && (
          <p className="flex items-center gap-4">
            <MapPin size={16} />{" "}
            {space.default_lang === "AR" && site.address_ar
              ? site.address_ar
              : site.address}
          </p>
        )}

        {site.phone !== " " && (
          <p className="flex items-center gap-4">
            <PhoneCall size={16} /> {site.phone}
          </p>
        )}
        {space.name !== " " && (
          <p className="flex items-center gap-4 font-semibold">
            {getIcon(space.type)}{" "}
            {space.default_lang === "AR" && space.name_ar
              ? space.name_ar
              : space.name}
          </p>
        )}
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
