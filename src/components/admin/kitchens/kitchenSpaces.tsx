import { Button } from "@/components/ui/button";
import { Eye, Unlink } from "lucide-react";
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
    {
      space_id: 8,
      space_name: "Space 3",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-md bg-slate-100 p-2">
      <h1 className="text-xl font-semibold">Kitchen Spaces</h1>
      <LinkSpaceDialog />
      <ScrollArea className="no-scrollbar flex snap-y flex-col overflow-y-scroll">
        {kitchenSpaces.map((space, index) => (
          <div
            key={index}
            className="mb-2 mr-3 flex snap-start items-center justify-between rounded-md bg-slate-300 p-2 shadow-sm"
          >
            <span className="text-lg font-medium">{space.space_name}</span>
            <div className="flex gap-2">
              <Button className="flex items-center space-x-1 p-2 text-sm">
                <Eye size={16} />
                <span>Details </span>
              </Button>
              <Button className="flex items-center space-x-1 p-2 text-sm">
                <Unlink size={16} />
                <span>Unlink </span>
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default KitchenSpaces;
