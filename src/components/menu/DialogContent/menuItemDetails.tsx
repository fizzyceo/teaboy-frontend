import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { translateString } from "@/lib/translate";
import { ChevronRight } from "lucide-react";

import Image from "next/image";

const MenuItemDetails = ({
  lang,
  item,
  note,
  setNote,
  handleValueChange,
  handleNext,
  currency,
  VAT,
  base_url,
}: any) => {
  const { options } = item;
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {" "}
          {lang === "ar" && item?.title_ar ? item?.title_ar : item.title}
        </DialogTitle>
      </DialogHeader>

      <div className="relative h-44 w-full overflow-hidden rounded-md md:h-48 lg:h-52">
        <Image
          src={base_url + "/" + item.images[0]}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
        {item.description ? (
          <p className="absolute bottom-2 left-2 w-fit rounded-lg bg-white bg-opacity-55 px-2 text-start text-xl text-black">
            {item.description}
          </p>
        ) : null}
        {item.price > 0 ? (
          <Badge
            className="absolute bottom-2 right-2 flex items-end space-x-3 text-xl font-extrabold outline-dashed outline-2 outline-offset-2 drop-shadow-md"
            variant={"secondary"}
          >
            <span className="text-xl font-extrabold text-gray-900">
              {item.price}
            </span>
            <span className="text-base font-semibold text-gray-500">
              {currency}
            </span>
          </Badge>
        ) : null}
      </div>

      <ScrollArea className="no-scrollbar max-h-[40vh] overflow-scroll">
        {options.length > 0 && (
          <div className="mb-4 flex w-full flex-col gap-3 pb-2">
            {options.map((option: any) => (
              <RadioGroup
                key={option.menu_item_option_id}
                className="flex w-full flex-col items-start gap-2"
                onValueChange={(value) =>
                  handleValueChange(option.menu_item_option_id, parseInt(value))
                }
                defaultValue={option.default_choice_id}
              >
                <p className="basis-2 text-xl font-bold">
                  {lang === "ar" && option?.name_ar
                    ? option.name_ar
                    : option.name}
                </p>
                <div className="flex w-full flex-wrap justify-start gap-3 gap-y-2">
                  {option.choices.map((choice: any) => (
                    <div
                      className="flex items-center space-x-2"
                      key={choice.choice_id}
                    >
                      <RadioGroupItem
                        value={choice.choice_id}
                        id={choice.choice_id}
                      />
                      <Label htmlFor={choice.choice_id}>
                        {lang === "ar" && choice?.name_ar
                          ? choice?.name_ar
                          : choice.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ))}
          </div>
        )}
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <Label htmlFor="note" className="text-xl font-bold">
            {translateString("Note", lang)}
          </Label>
          <div className="w-full p-1">
            <Input
              className="text-md"
              placeholder={`${translateString("Anything you want to add ...", lang)}`}
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button
          className="flex h-12 w-full items-center justify-center gap-4 py-6 text-2xl text-black"
          onClick={handleNext}
          variant={"nextStep"}
        >
          <span> {translateString("Next", lang)}</span>
          <ChevronRight />
        </Button>
      </DialogFooter>
    </>
  );
};
export default MenuItemDetails;
