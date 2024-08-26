import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import LinkTabletDialog from "./linkTabletDialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface KitchenDetailsFormProps {
  kitchen: {
    name: string;
    is_open: boolean;
    token: string;
  };
}

const KitchenDetailsForm = ({ kitchen }: KitchenDetailsFormProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md bg-slate-100 p-2">
      <div className="flex w-full items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Name</Label>
          <Input placeholder={kitchen.name} type="text" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="is-open" />
          <Label htmlFor="is-open">{kitchen.is_open ? "Open" : "Closed"}</Label>
        </div>
      </div>
      <Button className="w-full" variant={"outline"}>
        <span>Save</span>
        <Save />
      </Button>
    </div>
  );
};

export default KitchenDetailsForm;
