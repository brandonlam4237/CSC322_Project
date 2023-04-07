import "../scss/input.scss";
import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from "react";

// work in progress. NOT sure if its even worth pursuing 
interface InputProps extends React.ComponentProps<"input">{
  className: string
  type: "text" | "number" | "password" | "radio"
  onChange: (event:ChangeEvent<HTMLInputElement>) => void
}

export default function Input({className="input-field", type="text", ...remainderProps}:InputProps) {
  return <input className="input-field" {...remainderProps} />;
}
