import { LuUser } from "react-icons/lu";
import { IoIosStarOutline } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoCardOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

export interface Messages {
  [key: string]: string | undefined;
}

export const PROFILE_NAV_LINKS = (messages: Messages) => [
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
    key: "reviews",
    href: "/my_reviews",
    text: messages.reviews,
    icon: <IoIosStarOutline />,
  },
  {
    key: "favorites",
    href: "/favorites",
    text: messages.favorites,
    icon: <MdFavoriteBorder />,
  },
  {
    key: "business",
    href: "/my_business",
    text: messages.my_business,
    icon: <LuBriefcaseBusiness />,
  },
  {
    key: "Subscription",
    href: "/subscription",
    text: messages.subscriptions,
    icon: <IoCardOutline />,
  },
  {
    key: "settings",
    href: "/settings",
    text: messages.settings,
    icon: <IoSettingsOutline />,
  },
];
