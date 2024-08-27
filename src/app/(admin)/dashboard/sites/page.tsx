import AddNewSiteDialog from "@/components/admin/sites/addSiteDialog";
import SiteCard from "@/components/admin/sites/siteCard";

const SitesPage = () => {
  const sites = [
    {
      site_id: 1,
      name: "Site 1",
    },
    {
      site_id: 2,
      name: "Site 2",
    },
    {
      site_id: 3,
      name: "Site 3",
    },
  ];
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Sites</h1>
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
        <AddNewSiteDialog />
        {sites.map((site) => (
          <SiteCard key={site.site_id} site={site} />
        ))}
      </div>
    </section>
  );
};

export default SitesPage;
