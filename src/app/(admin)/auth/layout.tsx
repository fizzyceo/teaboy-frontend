interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-grid-black/[0.3] dark:bg-grid-white/[0.3] no-scrollbar relative flex min-h-screen w-full items-center justify-center bg-slate-200 py-10 dark:bg-white">
      {children}
    </main>
  );
};

export default AuthLayout;
