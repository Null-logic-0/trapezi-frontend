import { LuUser } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

export const PROFILE_NAV_LINKS = [
  {
    key: "home",
    href: "/",
    text: "Home",
    icon: <AiOutlineHome />,
  },
  {
    key: "profile",
    href: "/profile",
    text: "Profile",
    icon: <LuUser />,
  },
  {
    key: "reviews",
    href: "/my_reviews",
    text: "My Reviews",
    icon: <IoIosStarOutline />,
  },
  {
    key: "favorites",
    href: "/favorites",
    text: "Favorites",
    icon: <MdFavoriteBorder />,
  },
  {
    key: "business",
    href: "/my_business",
    text: "My Business",
    icon: <LuBriefcaseBusiness />,
  },
  {
    key: "Subscription",
    href: "/subscription",
    text: "Subscription",
    icon: <IoCardOutline />,
  },
  {
    key: "settings",
    href: "/settings",
    text: "Settings",
    icon: <IoSettingsOutline />,
  },
];
