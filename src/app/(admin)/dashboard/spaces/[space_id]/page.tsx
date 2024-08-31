import EditSpaceForm from "@/components/admin/spaces/editSpaceForm";
import SpaceMenus from "@/components/admin/spaces/spaceMenus";

const SpaceDetailsPage = async ({
  params,
}: {
  params: { space_id: number };
}) => {
  console.log("Space ID:", params.space_id);
  return (
    <div>
      <h1>Space Details</h1>
      <EditSpaceForm />
      <SpaceMenus />
    </div>
  );
};

export default SpaceDetailsPage;
