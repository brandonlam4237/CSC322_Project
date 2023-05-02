import "../scss/button.scss";
import { ReactNode } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children?: ReactNode
}

export default function Button({
  className,
  children,
  ...remainderProps
}: ButtonProps) {
  return (
    <button className={`${className}`} {...remainderProps}>
      {children}
    </button>
  );
}