"use client";
import AddMenuNameDialog from "@/components/admin/menu/addMenuNameDialog";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";

const AdminMenuPage = () => {
  const router = useRouter();
  const menus = [
    {
      id: 1,
      name: "menu 1",
      description: "Main Menu",
    },
    {
      id: 2,
      name: "menu 2",
      description: "VIP Menu",
    },
    {
      id: 3,
      name: "menu 3",
      description: "Lunch Menu",
    },
    {
      id: 4,
      name: "menu 4",
      description: "Dinner Menu",
    },
  ];
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Menus</h1>
      <div className="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
        <AddMenuNameDialog />
        {menus.map((menu) => (
          <Tilt key={menu.id}>
            <div
              className="bottom-0 flex h-60 flex-col justify-end space-y-0.5 rounded border bg-gradient-to-t from-slate-100 to-slate-50 p-4 pt-12"
              onClick={() => router.push(`/dashboard/menus/${menu.id}`)}
            >
              <h2>{menu.name}</h2>
              <p>{menu.description}</p>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default AdminMenuPage;
