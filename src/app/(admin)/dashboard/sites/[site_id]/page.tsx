const SiteDetailsPage = async ({ params }: { params: { site_id: number } }) => {
  return (
    <div>
      <h1>Site Details {params.site_id}</h1>
    </div>
  );
};

export default SiteDetailsPage;
