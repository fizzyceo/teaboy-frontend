import { create } from "zustand";

interface MenuItemOptionChoice {
  menu_item_option_choice_id: number;
  name: string;
}

interface MenuItemOption {
  menu_item_option_id: number;
  name: string;
  choices: MenuItemOptionChoice[];
}

interface ItemImage {
  item_image_id: number;
  image_url: string;
}

interface MenuItem {
  menu_item_id: number;
  title: string;
  price: number;
  description: string;
  available: boolean;
  categories: any[];
  item_images: ItemImage[];
  options: MenuItemOption[];
}

interface Site {
  site_id: number;
  name: string;
  address: string;
  phone: string;
  image_url: string;
}

interface Space {
  space_id: number;
  name: string;
  site: Site;
}

interface Menu {
  menu_id: number;
  name: string;
  description: string;
  restaurant_id: number;
  created_at: string;
  updated_at: string;
  ask_for_name: boolean;
  ask_for_table: boolean;
  spaces: Space[];
  menu_items: MenuItem[];
}

interface MenuStore {
  menu: Menu | null; // Allow menu to be null initially
  setMenu: (menu: Menu) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menu: null,
  setMenu: (menu) => set({ menu }),
}));
