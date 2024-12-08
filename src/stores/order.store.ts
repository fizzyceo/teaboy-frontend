import { create } from "zustand";

export type OrderOptionType = {
  choice_id: number;
  menu_item_option_id: number;
};
interface OrderStore {
  customerName?: string | undefined;
  orderLoading?: boolean | false;
  answer?: string;
  setCustomerName: (name: string) => void;
  setAnswer: (asnwer: string) => void;
  setOrderLoading: (val: boolean) => void;
  tableNumber?: number;
  setTableNumber: (tableNumber: number) => void;
  orderNumber?: string;
  setOrderNumber: (orderNumber: string) => void;
  note?: string | undefined;
  setNote: (note: string) => void;

  spaceId?: number;
  setSpaceId: (spaceId: number) => void;

  orderStatus: "Not Submitted" | "Submitted" | "Viewed" | "Canceled";
  setOrderStatus: (
    value: "Not Submitted" | "Submitted" | "Viewed" | "Canceled",
  ) => void;

  orderItems: OrderItem[];
  setOrderItems: (orderItems: any) => void;

  addOrderItem: (orderItem: OrderItem) => void;
  removeOrderItem: (orderItemId: number) => void;
  updateOrderItem: (orderItemId: number, orderItem: OrderItem) => void;
}

export interface OrderItem {
  identifier?: number;
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
  orderLoading: false,
  answer: "",
  setCustomerName: (name) => set({ customerName: name }),
  tableNumber: undefined,
  setTableNumber: (tableNumber) => set({ tableNumber }),
  setAnswer: (answer?: string) => set({ answer: answer }),
  note: undefined,
  setNote: (note) => set({ note }),
  orderItems: [],
  setOrderItems: (orderItems) => set({ orderItems }),
  orderNumber: "",
  setOrderNumber: (orderNumber) => set({ orderNumber }),

  spaceId: 0,
  setSpaceId: (spaceId) => set({ spaceId }),

  orderStatus: "Not Submitted",
  setOrderStatus: (value) => set({ orderStatus: value }),

  addOrderItem: (orderItem) => {
    set((state) => ({
      orderItems: [...state.orderItems, orderItem],
    }));
  },
  removeOrderItem: (orderItemId) =>
    set((state) => ({
      orderItems: state.orderItems.filter(
        (item) => item.identifier !== orderItemId && item,
      ),
    })),
  updateOrderItem: (orderItemId, orderItem) =>
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.menuItemId === orderItemId ? orderItem : item,
      ),
    })),

  setOrderLoading: (orderLoading) => {
    set({ orderLoading: orderLoading });
  },
}));
