import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
 base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2",

 variants: {
  variant: {
   primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
   secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
   list: "bg-zinc-900 py-8 rounded-xl flex shadow-shape gap-3 justify-start",
   danger: "bg-rose-800 hover:bg-rose-900 rounded-xl flex shadow-shape gap-3 justify-center"
  },

  size: {
   default: "py-2",
   full: "w-full h-11",
  },
 },

 defaultVariants: {
  variant: "primary",
  size: "default",
 },
});

interface ButtonProps
 extends ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
 children: ReactNode;
}

export function Button({ children, variant, size, ...rest }: ButtonProps) {
 return (
  <button {...rest} className={buttonVariants({ variant, size })}>
   {children}
  </button>
 );
}
