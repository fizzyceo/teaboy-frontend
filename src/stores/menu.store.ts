import { create } from "zustand";

interface MenuItemOptionChoice {
  menu_item_option_choice_id?: number;
  choice_id?: number;
  name: string;
  name_ar?: string;
}

interface MenuItemOption {
  menu_item_option_id: number;
  name: string;
  name_ar?: string;
  default_choice_id?: number;
  choices: MenuItemOptionChoice[];
}

interface ItemImage {
  item_image_id: number;
  image_url: string;
}

interface MenuItem {
  item_id: number;
  title: string;
  title_ar?: string;
  price: number;
  description: string;
  available: boolean;
  categories: any[];
  images: string[];
  item_images: ItemImage[];
  options: MenuItemOption[];
}

interface Site {
  site_id: number;
  name: string;
  name_ar?: string;

  address: string;
  address_ar?: string;

  phone: string;
  image_url: string;
}

interface Space {
  space_id: number;
  name: string;
  name_ar?: string;
  site: Site;
}

interface Menu {
  menu_id: number;
  name: string;
  name_ar?: string;
  description: string;
  currency?: string;
  image_url?: string;
  VAT: number;
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
  isOpen: boolean;
  setMenu: (menu: Menu) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  menu: null,
  isOpen: false,
  setMenu: (menu) => set({ menu }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
