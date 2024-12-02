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
    setAnswer,
    answer,
  } = useOrderStore();

  if (!menu) return null;

  const { ask_for_name, ask_for_table, ask, ask_ar } = menu;

  const question = lang === "ar" ? ask_ar : ask;
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">
          {translateString(question ? question : "Please Confirm", lang)}
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        {question && (
          <Input
            placeholder={translateString("Your Answer...", lang)}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-lg"
          />
        )}
      </div>
      {/* <div className="grid gap-4">
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
      </div> */}

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
