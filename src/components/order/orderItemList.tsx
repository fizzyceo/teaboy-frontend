import { OrderItem } from "@/stores/order.store";
import OrderItemCard from "./orderItemCard";
import { motion, AnimatePresence } from "framer-motion";

const OrderItemList = ({ orderItems }: { orderItems: OrderItem[] }) => {
  return (
    <div className="no-scrollbar flex max-h-[47vh] w-full snap-y flex-col gap-3 overflow-scroll px-1">
      <AnimatePresence>
        {orderItems.map((item: OrderItem) => (
          <motion.div
            key={item.identifier}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            <OrderItemCard {...item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderItemList;
