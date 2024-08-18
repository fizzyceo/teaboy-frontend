interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex h-auto min-h-screen w-full overflow-y-scroll bg-gradient-to-b from-slate-100 via-slate-300 to-slate-600 py-20">
      {children}
    </main>
  );
};

export default AuthLayout;
