"use client";
import createMenu from "@/actions/menu/create-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreateMenuStore from "@/stores/admin/create-menu.store";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddMenuNameDialog = () => {
  const router = useRouter();
  const { menu, setMenu } = useCreateMenuStore();
  const [menuName, setMenuName] = useState("");
  const handleOnSubmit = async () => {
    const createdMenu = await createMenu({ name: menuName });
    console.log("Menu Created", createdMenu);
    if (createdMenu) {
      setMenu(createdMenu);
      console.log("Menu --", menu);
      setMenuName("");
      router.push(`/dashboard/menus/create/${createdMenu.menu_id}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="animation flex h-60 w-full items-center justify-center rounded border bg-slate-200 duration-300 hover:scale-[102%] hover:bg-slate-100">
          <PlusIcon size={50} color="black" />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Menu Name</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter Menu Name"
          type="text"
          readOnly
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
        />
        <DialogFooter>
          <Button type="submit" size="sm" onClick={handleOnSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddMenuNameDialog;
