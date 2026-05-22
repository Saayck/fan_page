import { HTMLAttributes, ReactNode } from "react";
import { clsx } from "@/backend/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: boolean;
}

export default function Card({ children, padding = true, className, ...props }: CardProps) {
  return (
    <div
      className={clsx("card", padding && "p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
