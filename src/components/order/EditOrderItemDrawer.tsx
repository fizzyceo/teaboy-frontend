"use client";

import { useState } from "react";
import { CircleX, Edit } from "lucide-react";
import Image from "next/legacy/image";
import { useMenuStore } from "@/stores/menu.store";
import EditOrderItem from "@/actions/edit-order";
import { toast } from "sonner";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";

const EditOrderItemDrawer = (item: any) => {
  const { menuItems } = useMenuStore();

  const menuItem = menuItems.find(
    (menuItem) => menuItem.menu_item_id === item.menuItemId,
  ) || {
    options: [],
  };

  const [note, setNote] = useState(item.note || "");
  const [selectedOptions, setSelectedOptions] = useState(item.choices);

  console.log("selectedOptions", selectedOptions);

  const handleValueChange = (optionId: number, choiceId: number) => {
    setSelectedOptions((prevOptions: any) => {
      const updatedOptions = prevOptions.filter(
        (opt: any) => opt.menu_item_option_id !== optionId,
      );
      return [
        ...updatedOptions,
        { menu_item_option_id: optionId, menu_item_option_choice_id: choiceId },
      ];
    });
  };

  const handleEditOrder = async () => {
    const response = await EditOrderItem(item.orderItemId, {
      note,
      choices: selectedOptions.map((option: any) => ({
        menu_item_option_choice_id: option.menu_item_option_choice_id,
      })),
    });
    console.log(response);

    toast.success(`Order for ${item.menuItemTitle} updated successfully`, {
      duration: 3000,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="size-11 rounded-xl p-0">
          <Edit size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerClose className="absolute right-4 top-4">
          <CircleX size={34} className="z-50 hover:text-slate-700" />
        </DrawerClose>
        <DrawerHeader className="flex h-full w-full flex-col items-center gap-4 p-4 md:p-8 lg:p-8">
          <DrawerTitle className="text-nowrap text-2xl">
            {item.menuItemTitle}
          </DrawerTitle>
          <div className="relative h-52 w-full overflow-hidden rounded-md md:h-32 lg:h-32">
            <Image
              src={item.menuItemUrl}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            {item.price > 0 ? (
              <Badge
                className="absolute bottom-2 right-2 flex items-end space-x-3 text-xl font-extrabold outline-dashed outline-2 outline-offset-2 drop-shadow-md"
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
          <ScrollArea className="no-scrollbar max-h-[40vh] w-full overflow-auto">
            <div className="flex w-full flex-col gap-4">
              {menuItem.options.map((option: any) => (
                <RadioGroup
                  value={
                    selectedOptions.find(
                      (selectedOption: any) =>
                        selectedOption.menu_item_option_id ===
                        option.menu_item_option_id,
                    )?.menu_item_option_choice_id ||
                    option.choices[0].menu_item_option_choice_id
                  }
                  key={option.menu_item_option_id}
                  className="flex w-full flex-col items-start"
                  onValueChange={(value) =>
                    handleValueChange(
                      option.menu_item_option_id,
                      parseInt(value),
                    )
                  }
                >
                  <p className="basis-2 text-xl font-bold">{option.name}</p>
                  <div className="flex w-full flex-wrap gap-10">
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
            <div className="mb-16 mt-8 flex w-full flex-col items-start justify-start gap-4">
              <Label htmlFor="note" className="text-xl font-bold">
                Note
              </Label>
              <Textarea
                placeholder="Anything you want to add ..."
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </ScrollArea>
        </DrawerHeader>
        <DrawerFooter className="fixed bottom-2 w-full space-y-3">
          <Button className="text-xl" onClick={handleEditOrder}>
            Edit order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditOrderItemDrawer;
