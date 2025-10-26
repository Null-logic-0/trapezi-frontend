import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

function Checkbox({label, ...props}: CheckboxProps) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="appearance-none w-5 h-5 rounded-full border-2 border-[#ff6633] checked:bg-[#ff6633] checked:border-[#ff6633] transition-all duration-200 focus:outline-none"
                {...props}
            />
            {label && <span className="ml-2 text-sm font-semibold select-none">{label}</span>}
        </label>
    );
}

export default Checkbox;
