import { OrderItem, OrderItemUI } from "@/stores/order.store";
import OrderItemCard from "./orderItemCard";
import { motion, AnimatePresence } from "framer-motion";

const OrderItemList = ({
  lang,
  orderItems,
  currency,
}: {
  lang: string;
  orderItems: OrderItemUI[];
  currency?: string;
}) => {
  return (
    <div className="no-scrollbar flex max-h-[47vh] w-full snap-y flex-col gap-3 overflow-x-hidden overflow-y-scroll px-1">
      <AnimatePresence>
        {orderItems.map((item: OrderItemUI) => (
          <motion.div
            key={item.identifier}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <OrderItemCard currency={currency} lang={lang} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderItemList;
