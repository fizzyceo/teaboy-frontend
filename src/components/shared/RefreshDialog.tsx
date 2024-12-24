import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
const RefreshDialog = ({
  isOpen,
  resetTimer,
}: {
  isOpen: boolean;
  resetTimer: () => void; // Define the type
}) => {
  const handleRefresh = () => {
    // window.location.reload(); // Refresh the page
    resetTimer();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle> </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-center">Are you still here?</h2>
          <Button
            onClick={handleRefresh}
            variant={"nextStep"}
            className="w-1/2 rounded-full px-3 py-2 text-white"
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefreshDialog;
