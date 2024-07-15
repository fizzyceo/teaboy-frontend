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

interface Restaurant {
  restaurant_id: number;
  name: string;
  address: string;
  phone: string;
  image_url: string;
}

interface Menu {
  menu_id: number;
  name: string;
  description: string;
  restaurant_id: number;
  created_at: string;
  updated_at: string;
  restaurant: Restaurant;
  menu_items: MenuItem[];
}

interface MenuItemsStore {
  menuItems: MenuItem[];
  setMenuItems: (menuItems: MenuItem[]) => void;
}

export const useMenuStore = create<MenuItemsStore>((set) => ({
  menuItems: [],
  setMenuItems: (menuItems) => set({ menuItems }),
}));
