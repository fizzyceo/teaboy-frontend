import Header from "@/components/admin/layout/header";
import HeaderMobile from "@/components/admin/layout/mobile-header";
import SideNav from "@/components/admin/layout/side-navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <div className="flex min-h-screen flex-col sm:border-r sm:border-slate-700 md:ml-60">
          <Header />
          <HeaderMobile />
          <div className="bg-zinc-white flex flex-grow flex-col space-y-2 px-4 pb-4 pt-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
