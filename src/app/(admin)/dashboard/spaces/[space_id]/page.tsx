const SpaceDetailsPage = async ({
  params,
}: {
  params: { space_id: number };
}) => {
  console.log("Space ID:", params.space_id);
  return (
    <div>
      <h1>Space Details</h1>
    </div>
  );
};

export default SpaceDetailsPage;
