import { GiKnifeFork } from "react-icons/gi";
import { FiCoffee } from "react-icons/fi";
import { FaWineGlassEmpty } from "react-icons/fa6";
import { PiBreadBold } from "react-icons/pi";
import { LuCakeSlice } from "react-icons/lu";
import { Messages } from "@/interfaces/messages.interface";

export const CATEGORIES = (messages: Messages) => [
  { key: "all", name: messages.all, icon: <GiKnifeFork /> },
  { key: "restaurant", name: messages.restaurant, icon: <GiKnifeFork /> },
  { key: "cafe", name: messages.cafe, icon: <FiCoffee /> },
  { key: "bar", name: messages.bar, icon: <FaWineGlassEmpty /> },
  { key: "bakery", name: messages.bakery, icon: <PiBreadBold /> },
  { key: "pastry", name: messages.pastry, icon: <LuCakeSlice /> },
];

const getString = (value: string | string[] | undefined, fallback: string) =>
  (value as string) || fallback;

export const SELECT_CATEGORIES = (messages: Messages) => [
  { id: "restaurant", label: getString(messages.restaurant, "Restaurant") },
  { id: "cafe", label: getString(messages.cafe, "Cafe") },
  { id: "bar", label: getString(messages.bar, "Bar") },
  { id: "bakery", label: getString(messages.bakery, "Bakery") },
  { id: "pastry", label: getString(messages.pastry, "Pastry") },
];
