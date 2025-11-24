import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface StatCardProps {
  label: string;
  value: string | number;
  variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}
const StatCard = ({
  label,
  value,
  variant,
  className,
}: React.ComponentProps<"div"> & StatCardProps) => {
  const statCardVariants = cva(
    "flex w-full flex-col rounded-md border p-4 py-4",
    {
      variants: {
        variant: {
          primary: "border border-primary bg-primary/30 text-primary",
          secondary:
            "border border-border bg-secondary/30 text-secondary-foreground",
          success: "border-success bg-success/30 text-success",
          danger: "border-destructive bg-destructive/30 text-destructive",
          warning: "border-warning bg-warning/30 text-warning",
          info: "text-info-foreground border-info bg-info/30 text-info",
        },
      },
    },
  );

  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <span className="text-muted-foreground">{label}</span>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
