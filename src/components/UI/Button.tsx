"use client";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import SpinnerMini from "./SpinnerMini/SpinnerMini";

type ButtonProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  buttonType?: "fill" | "outline";
  isPending?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  buttonType = "fill",
  isDisabled,
  isPending,
  className,
  ...rest
}: ButtonProps) {
  const buttonStyle =
    buttonType === "fill"
      ? "bg-[#ff6633] text-white hover:bg-[#ff6633]/60"
      : "bg-[#f5f5f5] border-2 text-[#1A1A1A] border-[#e5e5e5] hover:bg-[#FFD166] ";
  return (
    <button
      disabled={isDisabled || isPending}
      className={twMerge(
        `${
          isDisabled
            ? `${buttonStyle} opacity-70 cursor-not-allowed`
            : `${buttonStyle} cursor-pointer`
        }  rounded-xl flex justify-center items-center gap-2 py-3 px-2 text-[16px] transition duration-200 ease-in-out font-bold w-full`,
        className
      )}
      {...rest}
    >
      {isPending && <SpinnerMini />}
      {children}
    </button>
  );
}

export default Button;
