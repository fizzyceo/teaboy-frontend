import { create } from "zustand";

interface OrderStore {
  customerName?: string | undefined;
  setCustomerName: (name: string) => void;
  tableNumber?: number;
  setTableNumber: (tableNumber: number) => void;
  note?: string | undefined;
  setNote: (note: string) => void;

  orderItems: OrderItem[];
  setQuantity: (orderItemId: number, quantity: number) => void;

  addOrderItem: (orderItem: OrderItem) => void;
  removeOrderItem: (orderItemId: number) => void;
  updateOrderItem: (orderItemId: number, orderItem: OrderItem) => void;
}

export interface OrderItem {
  quantity: number;
  note?: string;
  menuItemId: number;
  menuItemUrl: string;
  menuItemTitle: string;
  menuItemDescription: string;
  menuItemPrice: number;
}

export const useOrderStore = create<OrderStore>((set) => ({
  customerName: undefined,
  setCustomerName: (name) => set({ customerName: name }),
  tableNumber: undefined,
  setTableNumber: (tableNumber) => set({ tableNumber }),
  note: undefined,
  setNote: (note) => set({ note }),
  orderItems: [],

  setQuantity: (orderItemId, quantity) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.menuItemId === orderItemId ? { ...item, quantity } : item
      ),
    }));
  },
  // if the orderitm is already in the orderItems array, then update the quantity
  // else add the orderItem to the orderItems array
  addOrderItem: (orderItem) => {
    set((state) => ({
      orderItems: state.orderItems.some(
        (item) => item.menuItemId === orderItem.menuItemId
      )
        ? state.orderItems.map((item) =>
            item.menuItemId === orderItem.menuItemId
              ? { ...item, quantity: item.quantity + orderItem.quantity }
              : item
          )
        : [...state.orderItems, orderItem],
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
