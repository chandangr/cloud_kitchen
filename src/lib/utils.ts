import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//@ts-expect-error -- ginore
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
