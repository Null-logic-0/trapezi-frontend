import { GiKnifeFork } from "react-icons/gi";
import { FiCoffee } from "react-icons/fi";
import { FaWineGlassEmpty } from "react-icons/fa6";
import { PiBreadBold } from "react-icons/pi";
import { LuCakeSlice } from "react-icons/lu";
import { Messages } from "@/interfaces/messages.interface";

export const CATEGORIES = (messages: Messages) => [
  { key: "all", name: messages.all, icon: <GiKnifeFork /> },
  { key: "restaurant", name: messages.restaurants, icon: <GiKnifeFork /> },
  { key: "cafe", name: messages.cafes, icon: <FiCoffee /> },
  { key: "bar", name: messages.bars, icon: <FaWineGlassEmpty /> },
  { key: "bakery", name: messages.bakeries, icon: <PiBreadBold /> },
  { key: "pastry", name: messages.pastry, icon: <LuCakeSlice /> },
];
