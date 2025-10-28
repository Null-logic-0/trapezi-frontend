import ProfileAsideMenu from "@/components/Profile/ProfileAsideMenu";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center md:h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 w-full max-w-6xl">
        <ProfileAsideMenu />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
