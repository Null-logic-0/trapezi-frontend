import ProfileAsideMenu from "@/components/Profile/ProfileAsideMenu";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center ">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] pt-24 pb-12 max-md:px-4  gap-6 w-full max-w-7xl">
        <ProfileAsideMenu />
        <>{children}</>
      </div>
    </div>
  );
}

export default Layout;
