import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          className={cn(
            "w-full h-[44px] bg-white border border-[#E2E8F0] rounded-[12px] text-[#0F172A] text-sm px-4 pr-10 appearance-none transition-all duration-150 focus:outline-none focus:border-[#FB923C] focus:ring-2 focus:ring-[#FED7AA]/60 disabled:cursor-not-allowed disabled:bg-[#F1F5F9] cursor-pointer",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="absolute right-3.5 flex items-center pointer-events-none text-[#64748B]">
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
