import { Badge } from "@/components/ui/badge";
import { MenuItemOption } from "./menuItemOptions";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OptionsListProps {
  menuItemOptions: MenuItemOption[];
  setMenuItemOptions: (options: MenuItemOption[]) => void;
}

const OptionsList = ({
  menuItemOptions,
  setMenuItemOptions,
}: OptionsListProps) => {
  const handleOnDelete = (index: number) => {
    if (menuItemOptions.length > 1) {
      const newOptions = menuItemOptions.filter((_, i) => i !== index);
      setMenuItemOptions(newOptions);
      // TODO: remove the option from the database
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Options List</h2>
      {menuItemOptions.length === 0 ? (
        <p className="text-sm text-gray-500">No options added yet.</p>
      ) : (
        <ScrollArea className="no-scrollbar flex h-auto max-h-[174px] snap-y flex-col overflow-y-scroll pr-2">
          {menuItemOptions.map((option, index) => (
            <div
              key={index}
              className={`${
                index === menuItemOptions.length - 1 ? "" : "mb-2"
              } snap-start rounded-lg border-2 border-gray-200 bg-gray-100 p-2`}
            >
              <div className="flex items-center justify-between text-base text-gray-700">
                <div className="flex w-full flex-wrap items-center">
                  <Badge className="mr-2 flex w-1/4 items-center justify-center text-lg font-semibold">
                    {option.name}
                  </Badge>
                  {option.choices.map((choice, choiceIndex) => {
                    const isDefault =
                      choice.choice_id === option.default_choice_id;
                    return (
                      <div
                        key={choiceIndex}
                        className="mr-3 flex items-center text-base"
                      >
                        <span
                          className={`${
                            isDefault ? "font-semibold text-blue-600" : ""
                          }`}
                        >
                          {choice.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  className="size-6 cursor-pointer rounded-full bg-red-400 p-0"
                  onClick={() => handleOnDelete(index)}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default OptionsList;
