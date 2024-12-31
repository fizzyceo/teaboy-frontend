import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const AdCard = ({
  image_url,
  ad_url,
}: {
  image_url: string;
  ad_url: string;
}) => {
  return (
    <div className="relative flex h-40 w-full rounded-md border-4 border-black shadow-inner shadow-slate-800 sm:h-20 md:h-32 lg:h-36">
      <Link href={ad_url}>
        <div className="">
          <Image
            src={image_url}
            alt={ad_url}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
