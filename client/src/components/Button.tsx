import "../scss/button.scss";
import { ReactNode } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary";
  children?: ReactNode
}

export default function Button({
  variant,
  children,
  ...remainderProps
}: ButtonProps) {
  return (
    <button className={`${variant}`} {...remainderProps}>
      {children}
    </button>
  );
}