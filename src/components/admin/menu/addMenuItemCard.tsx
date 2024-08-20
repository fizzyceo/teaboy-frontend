const AddedMenuItemCard = (item: any) => {
  return (
    <div
      key={item.id}
      className="flex min-h-40 w-full snap-start items-center justify-center gap-4 rounded-sm border bg-slate-50 p-2"
    >
      Menu Item
    </div>
  );
};

export default AddedMenuItemCard;
