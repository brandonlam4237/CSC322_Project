import { ReactNode } from "react";
import "../scss/Box.scss";

interface BoxProps {
  className?: string;
  color?: "green" | "blue" | "red";
  isBold?: boolean;
  isRound?: boolean;
  padding?: number;
  children: ReactNode;
}

export default function Box({
  className="",
  color = "blue",
  isBold = false,
  padding = 10,
  isRound = false,
  children,
  ...remainderProps
}: BoxProps) {
  return (
    <div
      className={`Box ${className} ${color}`}
      style={{
        fontWeight: isBold ? "bold" : "",
        borderRadius: isRound ? "5px" : "",
        padding: `${padding}px`,
      }}
      {...remainderProps}
    >
      {children}
    </div>
  );
}
