"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { MenuItemOption } from "./addMenuItemOptions";

interface OptionsFormProps {
  menuItemOptions: MenuItemOption[];
  setMenuItemOptions: (options: MenuItemOption[]) => void;
}

const OptionsForm = ({
  menuItemOptions,
  setMenuItemOptions,
}: OptionsFormProps) => {
  const [option, setOption] = useState({
    option_name: "",
    option_choices: [""],
    default_choice: "",
  });

  const handleInputChange = (index: number, value: string) => {
    const newChoices = [...option.option_choices];
    newChoices[index] = value;
    setOption({ ...option, option_choices: newChoices });
  };

  const handleSubmit = () => {
    const payload: MenuItemOption = {
      name: option.option_name,
      choices: option.option_choices.map((choice) => ({ name: choice })),
      default_choice: { name: option.default_choice },
    };

    setMenuItemOptions([...menuItemOptions, payload]);

    setOption({
      option_name: "",
      option_choices: [""],
      default_choice: "",
    });
  };

  return (
    <div className="bg-white p-4">
      <div className="flex w-full items-center gap-4">
        <Label htmlFor="option_name" className="text-sm font-medium">
          Option
        </Label>
        <Input
          id="option_name"
          type="text"
          placeholder="Option Name"
          value={option.option_name}
          onChange={(e) =>
            setOption({ ...option, option_name: e.target.value })
          }
        />
        <Button
          onClick={() =>
            setOption({
              ...option,
              option_choices: [...option.option_choices, ""],
            })
          }
          variant="ghost"
        >
          <PlusIcon size={20} />
        </Button>
      </div>
      <RadioGroup
        className="mt-2"
        value={
          option.default_choice === ""
            ? option.option_choices[0]
            : option.default_choice
        }
        onValueChange={(value) =>
          setOption({ ...option, default_choice: value })
        }
      >
        {option.option_choices.map((choice, index) => (
          <div key={index} className="flex items-center gap-4">
            <RadioGroupItem value={choice} id={`choice-${index}`} />
            <Input
              type="text"
              placeholder="Option Choice"
              value={choice}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </RadioGroup>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleSubmit} className="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OptionsForm;
