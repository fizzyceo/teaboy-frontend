import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTrigger } from "@radix-ui/react-dialog";

const ExtraInfoForm = ({ handleNext }: any) => {
  const handleX = () => {};
  return (
    <>
      <DialogHeader>
        <DialogTitle>Extra Information</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="col-span-1 text-left">
            Name
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="col-span-1 text-left">
            Table
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <DialogTrigger asChild>
          <Button className="text-xl" onClick={handleX}>
            Finish
          </Button>
        </DialogTrigger>
      </DialogFooter>
    </>
  );
};
export default ExtraInfoForm;
