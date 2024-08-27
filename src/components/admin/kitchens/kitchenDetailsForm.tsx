"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";

interface KitchenDetailsFormProps {
  kitchen: {
    name: string;
    is_open: boolean;
    token: string;
  };
}

const kitchen = {
  name: "Kitchen 1",
  kitchen_id: 1,
  is_open: true,
  token: "123456",
};

const KitchenDetailsForm = () => {
  const [isOpen, setIsOpen] = useState(kitchen.is_open);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-md bg-slate-100 p-2">
      <div className="flex w-full items-center gap-6">
        <div className="flex w-2/3 items-center gap-3">
          <Label htmlFor="kitchen-name">Name</Label>
          <Input
            id="kitchen-name"
            defaultValue={kitchen.name}
            type="text"
            className=""
          />
        </div>
        <div className="flex w-1/3 items-center justify-between gap-2">
          <Label htmlFor="is-open">{isOpen ? "Open" : "Closed"}</Label>
          <Switch
            id="is-open"
            checked={isOpen}
            onCheckedChange={handleToggle}
          />
        </div>
      </div>
      <Button className="flex w-full items-center justify-center gap-2 text-lg">
        <Save />
        <span>Save Infos</span>
      </Button>
    </div>
  );
};

export default KitchenDetailsForm;
