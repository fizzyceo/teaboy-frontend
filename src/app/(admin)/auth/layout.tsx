interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
