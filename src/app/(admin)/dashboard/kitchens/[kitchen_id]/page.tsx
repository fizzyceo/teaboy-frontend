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
    <div className="flex w-full flex-1 flex-col gap-2">
      <h1 className="w-full text-2xl font-semibold">Kitchen Details</h1>
      <div className="flex w-full flex-1 gap-2">
        <div className="flex w-2/5 flex-col gap-2">
          <KitchenDetailsForm />
          <LinkTabletDialog kitchen_token={kitchen.token} />
          <KitchenSpaces />
        </div>
        <div className="w-3/5 flex-1">
          <OpeningHoursForm />
        </div>
      </div>
    </div>
  );
};

export default KitchenDetailsPage;
