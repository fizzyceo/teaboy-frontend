import { create } from "zustand";

export type OrderOptionType = {
  menu_item_option_choice_id: number;
  menu_item_option_id: number;
};
interface OrderStore {
  customerName?: string | undefined;
  setCustomerName: (name: string) => void;
  tableNumber?: number;
  setTableNumber: (tableNumber: number) => void;
  note?: string | undefined;
  setNote: (note: string) => void;

  orderItems: OrderItem[];

  addOrderItem: (orderItem: OrderItem) => void;
  removeOrderItem: (orderItemId: number) => void;
  updateOrderItem: (orderItemId: number, orderItem: OrderItem) => void;
}

export interface OrderItem {
  note?: string;
  menuItemId: number;
  menuItemUrl: string;
  menuItemTitle: string;
  menuItemDescription: string;
  menuItemPrice: number;
  choices?: OrderOptionType[];
}

export const useOrderStore = create<OrderStore>((set) => ({
  customerName: undefined,
  setCustomerName: (name) => set({ customerName: name }),
  tableNumber: undefined,
  setTableNumber: (tableNumber) => set({ tableNumber }),
  note: undefined,
  setNote: (note) => set({ note }),
  orderItems: [],

  addOrderItem: (orderItem) => {
    set((state) => ({
      orderItems: [...state.orderItems, orderItem],
    }));
  },
  removeOrderItem: (orderItemId) =>
    set((state) => ({
      orderItems: state.orderItems.filter(
        (item) => item.menuItemId !== orderItemId
      ),
    })),
  updateOrderItem: (orderItemId, orderItem) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.menuItemId === orderItemId ? orderItem : item
      ),
    })),
}));
