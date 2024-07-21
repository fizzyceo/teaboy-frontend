interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <h1>Admin Layout</h1>
      {children}
    </div>
  );
};

export default AdminLayout;
