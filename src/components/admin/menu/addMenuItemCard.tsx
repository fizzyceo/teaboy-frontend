"use client";
import Image from "next/legacy/image";

const AddedMenuItemCard = (item: any) => {
  console.log(item.item_images[0].image_url, "---");
  return (
    <div
      key={item.menu_item_id}
      className="flex h-56 w-full flex-col rounded-md bg-slate-200 p-2 sm:h-20 md:h-32 lg:h-36"
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={item.item_images[0].image_url}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <p className="text-xl font-semibold"> {item.title}</p>
    </div>
  );
};

export default AddedMenuItemCard;
