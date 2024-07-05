import { create } from "zustand";

interface OrderStore {
  customerName?: string | undefined;
  setCustomerName: (name: string) => void;
  tableNumber?: number;
  setTableNumber: (tableNumber: number) => void;
  note?: string | undefined;
  setNote: (note: string) => void;
  currentOrderItem: OrderItem | undefined;
  setCurrentOrderItem: (orderItem: OrderItem) => void;
  orderItems: OrderItem[];
  addOrderItem: (orderItem: OrderItem) => void;
  removeOrderItem: (orderItemId: number) => void;
  updateOrderItem: (orderItemId: number, orderItem: OrderItem) => void;
}

interface OrderItem {
  quantity: number;
  note?: string;
  menuItemId: number;
  status: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED" | "CANCELLED";
}

export const useOrderStore = create<OrderStore>((set) => ({
  customerName: undefined,
  setCustomerName: (name) => set({ customerName: name }),
  tableNumber: undefined,
  setTableNumber: (tableNumber) => set({ tableNumber }),
  note: undefined,
  setNote: (note) => set({ note }),
  orderItems: [],
  currentOrderItem: undefined,
  setCurrentOrderItem: (orderItem) => set({ currentOrderItem: orderItem }),

  addOrderItem: (orderItem) =>
    set((state) => ({ orderItems: [...state.orderItems, orderItem] })),
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
