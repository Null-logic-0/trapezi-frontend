"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../UI/Button";
import NavList from "./NavList";
import { useMessages } from "@/hooks/useMessages";
import { useUIContext } from "@/store/ui-context";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";

function BurgerMenu() {
  const router = useRouter();
  const messages = useMessages();
  const { user } = useFetchCurrentUser();
  const { toggleMenu, handleToggleMenu } = useUIContext();

  return (
    <AnimatePresence>
      {toggleMenu && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleToggleMenu}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col lg:hidden items-center justify-start pt-16 fixed top-16 right-0 h-screen w-[50%] sm:w-1/2 z-50 bg-white  shadow-2xl"
          >
            <NavList />
            {!user && (
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
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default BurgerMenu;
