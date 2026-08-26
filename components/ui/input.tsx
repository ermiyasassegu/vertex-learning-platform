import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-[44px] bg-white border border-[#E2E8F0] rounded-[12px] text-[#0F172A] placeholder:text-[#94A3B8] text-sm px-4 transition-all duration-150 focus:outline-none focus:border-[#FB923C] focus:ring-2 focus:ring-[#FED7AA]/60 disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]",
            leftIcon && "pl-10",
            rightElement && "pr-16",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showShortcut?: boolean;
  shortcutText?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      placeholder = "Search anything...",
      showShortcut = true,
      shortcutText = "⌘ K",
      ...props
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        leftIcon={<Search className="w-4 h-4 text-[#64748B]" />}
        placeholder={placeholder}
        rightElement={
          showShortcut ? (
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] rounded-[6px] select-none">
              {shortcutText}
            </kbd>
          ) : undefined
        }
        className={className}
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
