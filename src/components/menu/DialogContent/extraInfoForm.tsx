import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMenuStore } from "@/stores/menu.store";
import { useOrderStore } from "@/stores/order.store";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Send } from "lucide-react";

const ExtraInfoForm = ({ handleNext }: any) => {
  const { menu } = useMenuStore();
  const {
    customerName = "",
    setCustomerName,
    tableNumber = "",
    setTableNumber,
  } = useOrderStore();

  if (!menu) return null;

  const { ask_for_name, ask_for_table } = menu;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">Enter Your Name</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        {ask_for_name && (
          <Input
            placeholder="Customer Name"
            value={customerName}
            className="text-lg"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        )}
        {ask_for_table && (
          <Input
            placeholder="Table Number"
            value={tableNumber !== undefined ? tableNumber : ""}
            onChange={(e) =>
              setTableNumber(e.target.value ? parseInt(e.target.value) : 0)
            }
            className="text-lg"
          />
        )}
      </div>

      <DialogFooter>
        <DialogTrigger asChild>
          <Button
            className="flex h-12 w-full items-center justify-center gap-4 py-6 text-2xl text-black"
            onClick={handleNext}
            variant={"nextStep"}
          >
            <span>Send Order</span>
            <Send />
          </Button>
        </DialogTrigger>
      </DialogFooter>
    </>
  );
};

export default ExtraInfoForm;
