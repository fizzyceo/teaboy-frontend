import AddNewKitchenDialog from "@/components/admin/kitchens/addKitchenDialog";
import KitchenCard from "@/components/admin/kitchens/kitchenCard";

const KitchensPage = () => {
  const kitchens = [
    {
      kitchen_id: 1,
      name: "Kitchen 1",
    },
    {
      kitchen_id: 2,
      name: "Kitchen 2",
    },
    {
      kitchen_id: 3,
      name: "Kitchen 3",
    },
  ];

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Kitchens</h1>
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
        <AddNewKitchenDialog />
        {kitchens.map((kitchen) => (
          <KitchenCard key={kitchen.kitchen_id} kitchen={kitchen} />
        ))}
      </div>
    </section>
  );
};

export default KitchensPage;
