import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const OrderDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Check order</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>Order Moncef</DrawerHeader>
        <DrawerFooter>OrderTest</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderDrawer;
