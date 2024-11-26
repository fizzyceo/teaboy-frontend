"use client";
import Image from "next/legacy/image";

const MenuItemCard = ({ item }: { item: any }) => {
  return (
    <div
      key={`${item.item_id}-${item.title}`}
      className="flex min-h-72 w-full flex-col items-start gap-4 rounded-md border-[1px] border-slate-300 bg-gradient-to-bl from-slate-50 via-slate-100 to-slate-300 p-2"
    >
      <div className="relative h-52 w-full overflow-hidden sm:h-44 md:h-44">
        <Image
          src={item.item_images[0].image_url}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="text-xl font-semibold">{item.title}</p>
      {item.description !== "" && (
        <p className="text-lg font-normal">{item.description}</p>
      )}
    </div>
  );
};

export default MenuItemCard;
