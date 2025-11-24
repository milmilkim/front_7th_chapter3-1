import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, XCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        success:
          "border-success-light-border bg-success-light text-success-dark",
        info: "border-primary-light-border bg-primary-light text-primary-dark",
        destructive:
          "border-destructive-light-border bg-destructive-light text-destructive-dark",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  },
);

const alertIcons = {
  success: CheckCircle2,
  info: Info,
  destructive: XCircle,
};

function Alert({
  className,
  variant = "success",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  const Icon = alertIcons[variant ?? "success"];

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-4" />
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
