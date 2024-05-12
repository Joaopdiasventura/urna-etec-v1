import { ComponentProps } from "react";

export function InputComponent(props: ComponentProps<"input">) {
  return (
    <input
      className="w-full border rounded p-1 outline-none focus:shadow-lg transition-all focus:shadow-red-300 placeholder:text-center"
      {...props}
    />
  );
}
