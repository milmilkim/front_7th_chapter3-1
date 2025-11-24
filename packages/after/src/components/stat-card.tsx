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
          primary:
            "border-primary-light-border bg-primary-light text-primary-dark",
          secondary: "border-secondary-border bg-secondary text-secondary-foreground",
          success:
            "border-success-light-border bg-success-light text-success-dark",
          danger:
            "border-destructive-light-border bg-destructive-light text-destructive-dark",
          warning:
            "border-warning-light-border bg-warning-light text-warning-dark",
          info: "border-primary-light-border bg-primary-light text-primary-dark",
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
