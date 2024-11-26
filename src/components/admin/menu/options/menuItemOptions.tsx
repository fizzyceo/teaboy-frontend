"use client";
import { useState } from "react";
import OptionsForm from "./optionsForm";
import OptionsList from "./optionsList";

export interface MenuItemOption {
  name: string;
  choices: { choice_id: number; name: string }[];
  default_choice?: { name: string };
  default_choice_id: number;
}

const MenuItemOptions = () => {
  const [menuItemOptions, setMenuItemOptions] = useState<MenuItemOption[]>([]);

  return (
    <div className="w-ful h-full">
      <OptionsForm
        menuItemOptions={menuItemOptions}
        setMenuItemOptions={setMenuItemOptions}
      />
      <OptionsList
        menuItemOptions={menuItemOptions}
        setMenuItemOptions={setMenuItemOptions}
      />
    </div>
  );
};

export default MenuItemOptions;
