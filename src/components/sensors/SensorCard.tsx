import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { CloseButton } from "@/components/ui/close-button";

interface SensorCardProps {
  icon: ReactNode;
  name: string;
  value: string;
  unit: string;
  status: "Good" | "Warning";
  description: string;
  onHide: () => void;
}

export const SensorCard = ({
  icon,
  name,
  value,
  unit,
  status,
  description,
  onHide
}: SensorCardProps) => {
  return (
    <Card className="p-4 transition-all duration-200 hover:shadow-md relative">
      <CloseButton onClick={onHide} />
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{name}</span>
            <Badge
              variant="outline"
              className={`${
                status === "Good"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              }`}
            >
              {status}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-semibold">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
        </div>
      </div>
      <div className="text-sm text-muted-foreground pt-2 border-t">
        {description}
      </div>
    </Card>
  );
};
