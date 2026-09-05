import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Join class names, letting later Tailwind classes win over earlier ones.
 *
 * clsx flattens conditionals and arrays; twMerge then resolves conflicts, so a
 * caller passing `className="h-full"` overrides a component's own `h-64`
 * instead of both landing in the class list and the outcome depending on
 * stylesheet order. Every shadcn-style component expects this helper at
 * `@/lib/utils`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
