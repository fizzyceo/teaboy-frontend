import { create } from "zustand";

export type OrderOptionType = {
  choice_id: number;
  menu_item_option_id: number;
};

export interface SpaceOrder {
  order_item_id: number;
  note: string;
  quantity: number;
  menu_item_id: number;
  order_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  order: {
    customer_name: string;
    table_number: number | null;
    order_number: string;
    space: {
      name: string;
      name_ar: string;
      space_id: number;
      kitchen_id: number;
    };
  };
  choices: {
    option: string;
    option_id: number;
    choice: string;
    choice_id: number;
  }[];
  menu_item: {
    menu: {
      menu_id: number;
      name: string;
    };
    title: string;
    title_ar: string;
    available: boolean;
    description: string;
    price: number;
    item_images: {
      image_url: string;
    }[];
  };
}

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

  orderItems: OrderItemUI[];
  setOrderItems: (orderItems: any) => void;

  addOrderItem: (orderItem: OrderItemUI) => void;
  removeOrderItem: (orderItemId: number) => void;
  updateOrderItem: (orderItemId: number, orderItem: OrderItemUI) => void;
}

export interface OrderItemUI {
  identifier?: number;
  note?: string;
  menuItemId: number;
  menuItemUrl: string;
  menuItemTitle: string;
  menuItemDescription: string;
  menuItemPrice: number;
  choices?: OrderOptionType[];
}
export interface Order {
  order_id: number;
  order_number: string;
  customer_name: string;
  table_number: number | null;
  scheduled_at: string | null;
  spaceId: number;
  menuId: number;
  userId: number | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  answer: string | null;
  order_items: OrderItem[];
}

export interface OrderItem {
  order_item_id: number;
  note: string;
  status: string; // e.g., "PENDING", "IN_PROGRESS", etc.
  menu_item: MenuItem;
}

export interface MenuItem {
  menu_item_id: number;
  title: string;
  description: string;
  price: number;
  available: boolean;
  item_images: MenuItemImage[];
}

export interface MenuItemImage {
  image_url: string;
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
