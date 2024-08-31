import EditSiteForm from "@/components/admin/sites/editSiteForm";
import SiteMenus from "@/components/admin/sites/siteMenus";
import SiteSpaces from "@/components/admin/sites/siteSpaces";

const SiteDetailsPage = async ({ params }: { params: { site_id: number } }) => {
  return (
    <div>
      <h1>Site Details {params.site_id}</h1>
      <EditSiteForm />
      <div className="flex w-full gap-2">
        <SiteSpaces />
        <SiteMenus />
      </div>
    </div>
  );
};

export default SiteDetailsPage;
