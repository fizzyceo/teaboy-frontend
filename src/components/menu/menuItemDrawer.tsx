import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Image from "next/image";

const MenuItemDrawer = (item: any) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add To Cart</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerClose className="absolute top-4 right-4">
          <CircleX size={34} className="hover:text-slate-700 z-50" />
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>{item.description}</DrawerDescription>
          <div className="h-60 lg:h-full md:h-full w-full md:w-1/3 lg:w-1/3 relative rounded-md overflow-hidden bg-slate-500 ">
            <Image
              src={item.item_images[0].image_url}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default MenuItemDrawer;
