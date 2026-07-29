import type { ElementType, ReactNode } from "react";

export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
