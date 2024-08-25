"use client";
import { useState } from "react";
import OptionsForm from "./optionsForm";
import OptionsList from "./optionsList";

export interface MenuItemOption {
  name: string;
  choices: { name: string }[];
  default_choice: { name: string };
}

const AddMenuItemOptions = () => {
  const [menuItemOptions, setMenuItemOptions] = useState<MenuItemOption[]>([]);

  return (
    <div className="w-ful h-full">
      <OptionsForm
        menuItemOptions={menuItemOptions}
        setMenuItemOptions={setMenuItemOptions}
      />
      <OptionsList menuItemOptions={menuItemOptions} />
    </div>
  );
};

export default AddMenuItemOptions;