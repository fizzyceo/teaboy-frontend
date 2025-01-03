import Link from "next/link";
import Image from "next/image";
import { themeToCSS } from "@/lib/themeToCSS";

const AdCard = ({
  image_url,
  ad_url,
  title,
  theme,
}: {
  image_url: string;
  ad_url: string;
  title?: string;
  theme?: string;
}) => {
  return (
    <div
      style={theme ? themeToCSS(theme) : undefined}
      className={`relative flex h-[290px] w-full rounded-md border-4 ${theme ? `` : "bg-gradient-to-tr from-slate-50 to-slate-400"} p-3 shadow-inner sm:h-64 md:h-44`}
    >
      {/* <Link href={ad_url} passHref> */}
      <a href={ad_url} className="relative z-50 block h-full w-full rounded-sm">
        {title !== "**" && (
          <h1 className="absolute left-1/2 top-[15%] z-50 -translate-x-1/2 -translate-y-[15%] text-center text-xl font-bold text-slate-900">
            {title}
          </h1>
        )}
        <Image
          src={image_url}
          alt={ad_url}
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
          unoptimized
        />
      </a>
      {/* </Link> */}
    </div>
  );
};

export default AdCard;
