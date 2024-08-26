"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { MenuItemOption } from "./menuItemOptions";

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
  const [error, setError] = useState("");

  const handleInputChange = (index: number, value: string) => {
    const newChoices = [...option.option_choices];
    newChoices[index] = value;

    let newDefaultChoice = option.default_choice;
    if (
      newDefaultChoice === "" ||
      newDefaultChoice === option.option_choices[index]
    ) {
      newDefaultChoice = newChoices[0];
    }

    setOption({
      ...option,
      option_choices: newChoices,
      default_choice: newDefaultChoice,
    });

    if (new Set(newChoices).size !== newChoices.length) {
      setError("Duplicate choices are not allowed.");
    } else {
      setError("");
    }
  };

  const handleAddChoice = () => {
    if (option.option_choices.length >= 3) {
      setError("A maximum of 3 choices are allowed.");
      return;
    }

    if (option.option_choices.some((choice) => choice === "")) {
      setError("Please fill in the existing choices before adding a new one.");
      return;
    }

    setOption({
      ...option,
      option_choices: [...option.option_choices, ""],
    });
    setError("");
  };

  const handleRemoveChoice = (index: number) => {
    if (option.option_choices.length === 1) return;

    const newChoices = option.option_choices.filter((_, i) => i !== index);

    if (option.default_choice === option.option_choices[index]) {
      setOption((prev) => ({
        ...prev,
        option_choices: newChoices,
        default_choice: newChoices[0],
      }));
    }
  };

  const handleSubmit = () => {
    if (
      option.option_choices.some((choice) => choice === "") ||
      new Set(option.option_choices).size !== option.option_choices.length
    ) {
      setError("Please resolve all errors before submitting.");
      return;
    }

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
    setError("");

    // TODO : Save the option to the database
  };

  useEffect(() => {
    if (option.option_choices.length === 1 && option.default_choice === "") {
      setOption((prev) => ({
        ...prev,
        default_choice: prev.option_choices[0],
      }));
    }

    if (!option.option_choices.includes(option.default_choice)) {
      setOption((prev) => ({
        ...prev,
        default_choice: prev.option_choices[0],
      }));
    }
  }, [option.default_choice, option.option_choices]);

  return (
    <>
      <div className="flex w-full items-center">
        <Label htmlFor="option_name" className="mr-4 text-sm font-medium">
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
          onClick={handleAddChoice}
          variant="sendOrder"
          className="ml-2 space-x-1 px-2"
          disabled={
            option.option_choices.some((choice) => choice === "") ||
            option.option_choices.length >= 3
          }
        >
          <PlusIcon size={20} />
          <p className="text-sm">Add Choice</p>
        </Button>
      </div>
      <RadioGroup
        className="mt-2"
        value={option.default_choice}
        onValueChange={(value) =>
          setOption({ ...option, default_choice: value })
        }
      >
        {option.option_choices.map((choice, index) => (
          <div key={index} className="flex items-center">
            <div className="flex h-full w-1/4 items-center justify-center">
              <RadioGroupItem value={choice} id={`choice-${index}`} />
            </div>
            <div className="flex w-full gap-2">
              <Input
                type="text"
                placeholder="Option Choice"
                value={choice}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className=""
              />
              <Button
                className="w-1/4 p-0"
                variant={"destructive"}
                onClick={() => handleRemoveChoice(index)}
                disabled={option.option_choices.length === 1}
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div
        className={`mt-4 flex ${error ? "justify-between" : "justify-end"} `}
      >
        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          onClick={handleSubmit}
          variant={"nextStep"}
          disabled={
            option.option_choices.some((choice) => choice === "") ||
            new Set(option.option_choices).size !==
              option.option_choices.length ||
            option.option_name === "" ||
            option.option_choices.length === 1
          }
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default OptionsForm;
