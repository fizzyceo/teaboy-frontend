"use client";
import Tilt from "react-parallax-tilt";
import { useRouter } from "next/navigation";

const MenuCard = ({ menu }: { menu: any }) => {
  const router = useRouter();
  return (
    <Tilt key={menu.id}>
      <div
        className="bottom-0 flex h-60 flex-col justify-end space-y-0.5 rounded border bg-gradient-to-t from-slate-100 to-slate-50 p-4 pt-12"
        onClick={() => router.push(`/dashboard/menus/${menu.id}`)}
      >
        <h2>{menu.name}</h2>
        <p>{menu.description}</p>
      </div>
    </Tilt>
  );
};

export default MenuCard;
