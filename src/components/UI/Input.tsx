"use client";
import React, { ForwardedRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isTextArea?: boolean;
    isPassword?: boolean;
    ref?: ForwardedRef<HTMLInputElement>;
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    value?: string; // for controlled input
    defaultValue?: string; // for uncontrolled input
  };

function Input({
  isTextArea,
  isPassword,
  defaultValue,
  value,
  error,
  label,
  icon,
  ref,
  id,
  name,
  type,
  placeholder,
  className,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;
  const isActualPassword = isPassword && !showPassword;
  const inputType = isActualPassword
    ? "password"
    : showPassword
    ? "text"
    : type || "text";

  const mergedClass = twMerge(
    `w-full border-2 ${
      error ? "border-[#E50000]" : "border-[#e5e5e5]"
    } font-medium text-sm rounded-xl resize-none ${
      icon ? "pl-[42px]" : "px-3"
    } py-3 focus:border-[#ff6633] bg-[#f5f5f5] focus:outline-none`,
    className
  );

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="font-semibold text-sm">
          {label}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={inputId}
          name={name}
          className={mergedClass}
          placeholder={placeholder}
          {...(value !== undefined ? { value } : { defaultValue })}
          {...rest}
        />
      ) : (
        <div className="flex items-center relative w-full">
          {icon && <div className="absolute left-3">{icon}</div>}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            name={name}
            placeholder={placeholder}
            className={mergedClass}
            {...(value !== undefined ? { value } : { defaultValue })}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className="bg-transparent absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEye className="text-lg text-[#818DA2]" />
              ) : (
                <FiEyeOff className="text-lg text-[#818DA2]" />
              )}
            </button>
          )}
        </div>
      )}
      {error && <p className="text-sm text-[#E50000] font-medium">{error}</p>}
    </div>
  );
}

export default Input;
