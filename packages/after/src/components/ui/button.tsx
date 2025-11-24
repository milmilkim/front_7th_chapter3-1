/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex shrink-0 items-center justify-center gap-2 rounded-xs border text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        primary:
          "border-primary-border bg-primary text-primary-foreground hover:bg-primary-hover",
        danger:
          "border-destructive-border bg-destructive text-white hover:bg-destructive-hover focus-visible:ring-destructive/20",
        secondary:
          "border-secondary-border bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        success:
          "border-success-border bg-success text-white hover:bg-success-hover focus-visible:ring-success/20",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    </>
  );
}

export { Button, buttonVariants };
