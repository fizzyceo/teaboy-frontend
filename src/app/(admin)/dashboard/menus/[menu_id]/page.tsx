"use client";

import { useMenuStore } from "@/stores/menu.store";

const SingleMenuPage = ({ params }: { params: { menu_id: string } }) => {
  const { menu, setMenu } = useMenuStore();
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Menu {params.menu_id}</h1>
      <p>{JSON.stringify(menu)}</p>
      <div className="flex h-full w-full items-center justify-center bg-slate-100">
        Menu Details
      </div>
    </section>
  );
};

export default SingleMenuPage;
