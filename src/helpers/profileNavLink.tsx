import { LuUser, LuBriefcaseBusiness } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCardOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { Messages } from "@/interfaces/messages.interface";

export const PROFILE_NAV_LINKS = (
  messages: Messages,
  isBusinessAccount = false
) => {
  const links = [
    {
      key: "home",
      href: "/",
      text: messages.home,
      icon: <AiOutlineHome />,
    },
    {
      key: "profile",
      href: "/profile",
      text: messages.profile,
      icon: <LuUser />,
    },

    {
      key: "favorites",
      href: "/favorites",
      text: messages.favorites,
      icon: <MdFavoriteBorder />,
    },
    {
      key: "places",
      href: "/my-places",
      text: messages.my_business,
      icon: <LuBriefcaseBusiness />,
      requiresBusiness: true,
    },
    {
      key: "subscription",
      href: "/subscription",
      text: messages.subscriptions,
      icon: <IoCardOutline />,
      requiresBusiness: true,
    },
    {
      key: "settings",
      href: "/profile/settings",
      text: messages.settings,
      icon: <IoSettingsOutline />,
    },
  ];

  return links.filter((link) => !link.requiresBusiness || isBusinessAccount);
};
