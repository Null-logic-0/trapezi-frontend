import { fetchCurrentUser } from "@/lib/api/fetchCurrentUser";
import Logo from "../UI/Logo";
import AuthActions from "./AuthActions";
import NavList from "./NavList";
import BurgerMenu from "./BurgerMenu";

async function HeaderNavMenu() {
  const user = await fetchCurrentUser();
  return (
    <>
      <header className="flex fixed z-50 justify-center items-center bg-[#fdfdfd] border-b border-[#e3e3e3] w-full">
        <nav className="flex justify-between items-center p-2 max-w-7xl w-full">
          <Logo />
          <div className="max-lg:hidden">
            <NavList />
          </div>

          <AuthActions currentUser={user} />
        </nav>
      </header>
      <BurgerMenu />
    </>
  );
}

export default HeaderNavMenu;
