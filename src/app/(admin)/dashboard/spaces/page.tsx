import AddNewSpaceDialog from "@/components/admin/spaces/addSpaceDialog";
import SpaceCard from "@/components/admin/spaces/spaceCard";

const SpacesPage = () => {
  const spaces = [
    {
      space_id: 1,
      name: "Space 1",
    },
    {
      space_id: 2,
      name: "Space 2",
    },
    {
      space_id: 3,
      name: "Space 3",
    },
  ];
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Spaces</h1>
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
        <AddNewSpaceDialog />
        {spaces.map((space) => (
          <SpaceCard key={space.space_id} space={space} />
        ))}
      </div>
    </section>
  );
};

export default SpacesPage;
