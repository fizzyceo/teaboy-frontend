interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex h-auto min-h-screen w-full overflow-y-scroll bg-gradient-to-tr from-slate-500 via-slate-300 to-slate-600 py-10">
      {children}
    </main>
  );
};

export default AuthLayout;
