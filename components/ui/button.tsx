import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "text";
  size?: "default" | "md" | "sm";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      icon,
      iconPosition = "right",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB923C] focus-visible:ring-offset-2 select-none";

    const variantStyles = {
      primary: disabled
        ? "bg-[#FFEEE5] text-[#FDBA74] cursor-not-allowed shadow-none"
        : "bg-[#F97316] text-white hover:bg-[#EA580C] active:bg-[#C2410C] shadow-sm",
      secondary: disabled
        ? "border border-[#FED7AA] text-[#FED7AA] bg-transparent cursor-not-allowed"
        : "border border-[#FB923C] text-[#F97316] bg-white hover:bg-[#FFEEE5] hover:border-[#F97316] active:bg-[#FED7AA]",
      tertiary: disabled
        ? "border border-[#E2E8F0] text-[#CBD5E1] bg-white cursor-not-allowed"
        : "border border-[#E2E8F0] text-[#0F172A] bg-white hover:bg-[#F8FAFC] hover:border-[#CBD5E1] shadow-sm",
      text: disabled
        ? "text-[#CBD5E1] bg-transparent cursor-not-allowed"
        : "text-[#F97316] bg-transparent hover:text-[#EA580C] p-0 h-auto",
    };

    const sizeStyles = {
      default: variant === "text" ? "" : "h-[44px] px-4 text-[15px] rounded-[12px] gap-2",
      md: variant === "text" ? "" : "h-[40px] px-3 text-sm rounded-[12px] gap-1.5",
      sm: variant === "text" ? "" : "h-[34px] px-2.5 text-xs rounded-[8px] gap-1.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
