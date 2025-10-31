"use client";
import { useRouter } from "next/navigation";
import Button from "../UI/Button";
import LanguageToggle from "../UI/LanguageToggle";
import { FaRegUser } from "react-icons/fa";
import { useMessages } from "@/hooks/useMessages";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useUIContext } from "@/store/ui-context";
import { AnimatePresence, motion } from "framer-motion";

function AuthActions({ currentUser }: { currentUser: object | null }) {
  const router = useRouter();
  const messages = useMessages();
  const { toggleMenu, handleToggleMenu } = useUIContext();

  return (
    <div className="flex items-center gap-2 ">
      <LanguageToggle />
      {!currentUser ? (
        <Button
          onClick={() => router.push("/profile")}
          buttonType="outline"
          className="bg-transparent  text-xl border-none rounded-lg w-12 px-2"
        >
          <FaRegUser />
        </Button>
      ) : (
        <div className="flex justify-center items-center w-full max-lg:hidden   gap-2">
          <Button
            onClick={() => router.push("/login")}
            buttonType="outline"
            className="text-[#FF6B35] text-sm shrink-0 w-18  rounded-lg"
          >
            {messages.login}
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            buttonType="fill"
            className="text-sm   rounded-lg"
          >
            {messages.signup}
          </Button>
        </div>
      )}
      <Button
        onClick={handleToggleMenu}
        buttonType="outline"
        className="text-xl lg:hidden rounded-lg w-12 h-12 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {toggleMenu ? (
            <motion.div
              key="cross"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RxCross1 />
            </motion.div>
          ) : (
            <motion.div
              key="hamburger"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RxHamburgerMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

export default AuthActions;
