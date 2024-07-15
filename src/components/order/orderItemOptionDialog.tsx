"use client";
import { CircleX, Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

const OrderItemOptionDialog = (item: any) => {
  const options = item.options || [];

  const [note, setNote] = useState(item.note || "");
  const [selectedOptions, setSelectedOptions] = useState(item.choices);

  const handleEditOrder = () => {};
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-0 size-11 rounded-xl">
          <Edit size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerClose className="absolute top-4 right-4">
          <CircleX size={34} className="hover:text-slate-700 z-50" />
        </DrawerClose>
        <DrawerHeader className="flex flex-col items-center gap-4 w-full h-full p-4 md:p-8 lg:p-8">
          <DrawerTitle className="text-nowrap text-2xl">
            {item.title}
          </DrawerTitle>
          <div className="h-52 lg:h-32 md:h-32 w-full relative rounded-md overflow-hidden  ">
            <Image
              src={item.menuItemUrl}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            {item.price > 0 ? (
              <Badge
                className="flex text-xl items-end space-x-3 absolute outline-offset-2 outline-2 outline-dashed right-2 bottom-2 font-extrabold drop-shadow-md"
                variant={"secondary"}
              >
                <span className="text-xl font-extrabold text-gray-900">
                  {item.price}
                </span>
                <span className="text-base font-semibold text-gray-500">
                  DA
                </span>
              </Badge>
            ) : null}
          </div>
          <p className="text-start text-xl w-full">{item.description}</p>
          <div className="flex flex-col gap-4  w-full">
            {options.map((option: any) => (
              <RadioGroup
                key={option.menu_item_option_id}
                className="flex flex-col items-start w-full"
                // onValueChange={(value) =>
                //   handleValueChange(option.menu_item_option_id, parseInt(value))
                // }
              >
                <p className="basis-2 font-bold text-xl">{option.name}</p>
                <div className="flex w-full gap-10  flex-wrap">
                  {option.choices.map((choice: any) => (
                    <div
                      className="flex items-center space-x-2"
                      key={choice.menu_item_option_choice_id}
                    >
                      <RadioGroupItem
                        value={choice.menu_item_option_choice_id}
                        id={choice.menu_item_option_choice_id}
                      />
                      <Label htmlFor={choice.menu_item_option_choice_id}>
                        {choice.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ))}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <Label htmlFor="note">Note</Label>
            <Textarea
              placeholder="Anything you want to add ..."
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </DrawerHeader>
        <DrawerFooter className="w-full space-y-3">
          <Button className="text-xl" onClick={handleEditOrder}>
            Edit order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderItemOptionDialog;
