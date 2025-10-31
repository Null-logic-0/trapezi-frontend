"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../UI/Button";
import NavList from "./NavList";
import { useMessages } from "@/hooks/useMessages";
import { useUIContext } from "@/store/ui-context";

function BurgerMenu() {
  const router = useRouter();
  const messages = useMessages();
  const { toggleMenu, handleToggleMenu } = useUIContext();

  return (
    <AnimatePresence>
      {toggleMenu && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col lg:hidden items-center justify-center fixed top-0 left-0 w-full z-10 bg-white h-screen"
        >
          <NavList />
          <div className="flex justify-center max-w-[125px] items-center w-full flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                router.push("/login");
                handleToggleMenu();
              }}
              buttonType="outline"
              className="text-[#FF6B35] text-sm rounded-lg w-full"
            >
              {messages.login}
            </Button>
            <Button
              onClick={() => {
                router.push("/signup");
                handleToggleMenu();
              }}
              buttonType="fill"
              className="text-sm rounded-lg w-full"
            >
              {messages.signup}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BurgerMenu;
