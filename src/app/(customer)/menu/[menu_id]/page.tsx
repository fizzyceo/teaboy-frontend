const MenuPage = ({ params }: { params: { menu_id: number } }) => {
  return (
    <div>
      <h1>Menu {params.menu_id} Page</h1>
    </div>
  );
};

export default MenuPage;
