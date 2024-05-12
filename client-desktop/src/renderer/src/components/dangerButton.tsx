import { ComponentProps } from "react";

export function DangerButton(props: ComponentProps<"button">) {
  return (
    <button
      className="bg-zinc-600 text-white px-3 py-1 transition-all rounded hover:bg-zinc-800"
      {...props}
    >
      {props.value}
    </button>
  );
}
