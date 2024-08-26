import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const AddItemButton = () => {
  return (
    <div className="flex h-8 w-full items-center justify-center space-x-2 rounded-md bg-slate-200 p-4">
      <PlusIcon />
      <span>Add Item</span>
    </div>
  );
};

export default AddItemButton;
