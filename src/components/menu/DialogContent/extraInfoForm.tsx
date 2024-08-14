import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMenuStore } from "@/stores/menu.store";
import { useOrderStore } from "@/stores/order.store";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
        <DialogTitle>Extra Information</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        {ask_for_name && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="col-span-1 text-left">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={customerName || ""}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        )}
        {ask_for_table && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="table" className="col-span-1 text-left">
              Table
            </Label>
            <Input
              id="table"
              className="col-span-3"
              type="number"
              value={tableNumber !== undefined ? tableNumber : ""}
              onChange={(e) =>
                setTableNumber(e.target.value ? parseInt(e.target.value) : 0)
              }
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <DialogTrigger asChild>
          <Button className="text-xl" onClick={handleNext}>
            Finish
          </Button>
        </DialogTrigger>
      </DialogFooter>
    </>
  );
};

export default ExtraInfoForm;
