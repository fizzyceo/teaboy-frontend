import { Badge } from "@/components/ui/badge";
import { MenuItemOption } from "./addMenuItemOptions";

interface OptionsListProps {
  menuItemOptions: MenuItemOption[];
}

const OptionsList = ({ menuItemOptions }: OptionsListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Options List</h2>
      {menuItemOptions.length === 0 ? (
        <p className="text-sm text-gray-500">No options added yet.</p>
      ) : (
        <div className="space-y-2">
          {menuItemOptions.map((option, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-gray-200 bg-gray-100 p-2 px-3"
            >
              <div className="flex flex-wrap gap-4 text-base text-gray-700">
                <Badge className="mr-1 flex w-1/4 items-center justify-center text-lg font-semibold">
                  {option.name}
                </Badge>
                {option.choices.map((choice, choiceIndex) => {
                  const isDefault = choice.name === option.default_choice.name;
                  return (
                    <div key={choiceIndex} className="flex items-center">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionsList;
