const SiteSpaces = () => {
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
    {
      space_id: 4,
      name: "Space 4",
    },
    {
      space_id: 5,
      name: "Space 5",
    },
    {
      space_id: 6,
      name: "Space 6",
    },
  ];
  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-semibold">Spaces</h2>
      <div className="flex flex-col gap-3">
        <div className="bg-slate-200 p-2">
          <h3 className="text-xl font-semibold">Add Space</h3>
        </div>
        {spaces.map((space) => {
          return (
            <div key={space.space_id} className="min-w-60 bg-slate-200 p-2">
              <h3 className="text-xl font-semibold">{space.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteSpaces;
