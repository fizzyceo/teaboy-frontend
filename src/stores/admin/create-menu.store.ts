import { create } from "zustand";

interface Menu {
  menu_id: number;
  name: string;
}

interface CreateMenuStore {
  menu: Menu;
  setMenu: (menu: Menu) => void;
}

const useCreateMenuStore = create<CreateMenuStore>((set) => ({
  menu: { menu_id: 0, name: "" },
  setMenu: (menu) => set({ menu }),
}));

export default useCreateMenuStore;
