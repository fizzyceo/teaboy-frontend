"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useOrderStore } from "@/stores/order.store";

const CustomerNameDialog = () => {
  const { customerName, setCustomerName } = useOrderStore();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Confirm Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Label htmlFor="customer-name">Customer Name (Optional)</Label>
        <Input
          id="customer-name"
          placeholder="Enter Your Name "
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          <DialogClose asChild>Cancel</DialogClose>
          <DialogClose>
            <Button className="w-full mt-4">Confirm Order</Button>{" "}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerNameDialog;
