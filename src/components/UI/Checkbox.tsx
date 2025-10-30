import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          {...props}
          className="peer appearance-none w-5 h-5 rounded-full border-2 border-[#ff6933] bg-white checked:bg-[#ff6933] checked:border-[#ff6933] transition-all duration-200 cursor-pointer"
        />
        <svg
          className="absolute w-4 h-4 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && (
        <span className="ml-2 text-sm font-semibold select-none">{label}</span>
      )}
    </label>
  );
}

export default Checkbox;
