import { createContext, useContext, useState, useCallback } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

type AlertVariant = "success" | "error";

interface AlertItem {
  id: number;
  title: string;
  message: string;
  variant: AlertVariant;
}

interface AlertContextType {
  alerts: AlertItem[];
  addAlert: (title: string, message: string, variant: AlertVariant) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = useCallback(
    (title: string, message: string, variant: AlertVariant) => {
      const id = Date.now();
      setAlerts([{ id, title, message, variant }]);
    },
    [],
  );

  const removeAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};

export const AlertContainer = () => {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="mb-4 space-y-2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.variant === "success" ? "success" : "destructive"}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
          <button
            onClick={() => removeAlert(alert.id)}
            className="absolute top-2 right-2 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="size-4" />
          </button>
        </Alert>
      ))}
    </div>
  );
};
