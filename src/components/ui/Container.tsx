import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div
      style={{
        width: "min(1200px,92%)",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}