import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AddOptionDialog = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <Label htmlFor="category" className="text-left">
          Options
        </Label>
        <AddOptionDialog />
      </div>
      <div className="no-scrollbar flex max-h-[140px] w-full snap-y flex-col gap-2 overflow-y-scroll">
        {[
          {
            option: "Sugar",
            choices: [
              {
                value: "high",
                isDefault: true,
              },
              {
                value: "low",
                isDefault: false,
              },
              {
                value: "medium",
                isDefault: false,
              },
            ],
          },
          {
            option: "Milk",
            choices: [
              {
                value: "Yes",
                isDefault: true,
              },
              {
                value: "No",
                isDefault: false,
              },
            ],
          },
          {
            option: "Size",
            choices: [
              {
                value: "Small",
                isDefault: true,
              },
              {
                value: "Medium",
                isDefault: false,
              },
              {
                value: "Large",
                isDefault: false,
              },
            ],
          },
        ].map((option) => {
          return (
            <div
              className="flex h-16 max-h-20 w-full snap-start flex-col gap-1 rounded-md border-2 border-slate-200 bg-slate-50 p-1"
              key={option.option}
            >
              <p>{option.option}</p>
              <div className="flex w-full flex-wrap gap-4">
                {option.choices.map((choice) => (
                  <div key={choice.value} className="flex gap-1">
                    <input type="radio" />
                    <p>{choice.value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddOptionDialog;
