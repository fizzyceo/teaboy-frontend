import { Button } from "@/components/ui/button";
import { Unlink } from "lucide-react";
import LinkSpaceDialog from "./linkSpaceDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const KitchenSpaces = () => {
  const kitchenSpaces = [
    {
      space_id: 1,
      space_name: "Space 1",
    },
    {
      space_id: 2,
      space_name: "Space 2",
    },
    {
      space_id: 4,
      space_name: "Space 2",
    },
    {
      space_id: 3,
      space_name: "Space 3",
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-md bg-slate-100 p-2">
      <h1 className="text-xl font-semibold">Kitchen Spaces</h1>
      <LinkSpaceDialog />
      <ScrollArea className="flex h-48 snap-y snap-mandatory flex-col gap-2 overflow-y-auto">
        {kitchenSpaces.map((space) => (
          <div
            key={space.space_id}
            className="mb-2 flex snap-start items-center justify-between rounded-md bg-slate-300 px-4 py-2 shadow-sm"
          >
            <span className="text-lg font-medium">{space.space_name}</span>
            <Button
              variant="destructive"
              className="flex items-center space-x-2 p-2"
            >
              <span>Unlink</span>
              <Unlink size={16} />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default KitchenSpaces;
