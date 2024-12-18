import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
 base:
  "rounded-lg px-5 sm:h-10 h-6 sm:py-0 py-8 font-medium flex items-center justify-center gap-2",

 variants: {
  variant: {
   primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
   secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
   list:
    "bg-zinc-900 py-8 h-16 rounded-xl flex shadow-shape gap-3 justify-start hover:bg-lime-300 hover:text-zinc-900",
   danger:
    "bg-rose-800 hover:bg-rose-900 rounded-xl flex shadow-shape gap-3 justify-center",
   disabled: "bg-zinc-800 text-zinc-200",
  },

  size: {
   default: "sm:w-[240px] w-[160px] h-10",
   full: "w-full",
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
