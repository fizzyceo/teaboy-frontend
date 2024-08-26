import getKitchenById from "@/actions/admin/get-kitchen-by-id";
import KitchenDetailsForm from "@/components/admin/kitchens/kitchenDetailsForm";
import KitchenSpaces from "@/components/admin/kitchens/kitchenSpaces";
import LinkTabletDialog from "@/components/admin/kitchens/linkTabletDialog";
import { OpeningHoursForm } from "@/components/admin/kitchens/openingHoursForm";

const KitchenDetailsPage = async ({
  params,
}: {
  params: { kitchen_id: number };
}) => {
  //   const kitchen = await getKitchenById(params.kitchen_id);
  const kitchen = {
    name: "Kitchen 1",
    kitchen_id: 1,
    isOpen: true,
    token: "123456",
    openingHours: [
      {
        openingHours_id: 1,
        dayOfWeek: "SUNDAY",
        openTime: "09:00",
        closeTime: "18:00",
      },
      {
        openingHours_id: 2,
        dayOfWeek: "MONDAY",
        openTime: "09:00",
        closeTime: "18:00",
      },
      {
        openingHours_id: 3,
        dayOfWeek: "TUESDAY",
        openTime: "09:00",
        closeTime: "18:00",
      },
      {
        openingHours_id: 4,
        dayOfWeek: "WEDNESDAY",
        openTime: "09:00",
        closeTime: "18:00",
      },
    ],
  };

  return (
    <div className="grid h-full w-full grid-cols-2 gap-2">
      <h1 className="col-span-2 mb-2 px-2 text-xl font-semibold">
        Kitchen Details
      </h1>
      <div className="col-span-1 flex flex-col gap-2">
        <KitchenDetailsForm
          kitchen={{
            name: kitchen.name,
            is_open: kitchen.isOpen,
            token: kitchen.token,
          }}
        />
        <LinkTabletDialog kitchen_token={kitchen.token} />
        <KitchenSpaces />
      </div>
      <div className="col-span-1 h-full w-full">
        <OpeningHoursForm />
      </div>
    </div>
  );
};

export default KitchenDetailsPage;
