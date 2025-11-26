import { ModeToggle } from "./mode-toggle";

export const Header: React.FC = () => {
  return (
    <header className="z-header sticky top-0 items-center justify-center border-b bg-card shadow-sm">
      <div className="m-auto my-0 flex h-16 max-w-[1400px] justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
            L
          </div>

          <div>
            <h1 className="m-0 text-lg leading-none font-bold text-foreground">
              Hanghae Company
            </h1>
            <p className="m-0 mt-[2px] text-[11px] leading-none text-muted-foreground">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold text-foreground">
              Demo User
            </div>
            <div className="text-caption">demo@example.com</div>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-base font-semibold text-primary">
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
