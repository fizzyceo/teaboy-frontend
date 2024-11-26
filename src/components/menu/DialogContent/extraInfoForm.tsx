import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { translateString } from "@/lib/translate";
import { useMenuStore } from "@/stores/menu.store";
import { useOrderStore } from "@/stores/order.store";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Send } from "lucide-react";

const ExtraInfoForm = ({
  lang,
  handleNext,
}: {
  lang: string;
  handleNext: any;
}) => {
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
        <DialogTitle className="text-left">
          {translateString("Enter Your Name", lang)}
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        {ask_for_name && (
          <Input
            placeholder={`${translateString("Customer Name", lang)}`}
            value={customerName}
            className="text-lg"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        )}
        {ask_for_table && (
          <Input
            placeholder={`${translateString("Table Number", lang)}`}
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
            <span>{translateString("Send Order", lang)}</span>
            <Send />
          </Button>
        </DialogTrigger>
      </DialogFooter>
    </>
  );
};

export default ExtraInfoForm;
