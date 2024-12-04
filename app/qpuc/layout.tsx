export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-fuchsia-700 overflow-y-hidden ">
      {children}
    </div>
  );
}
