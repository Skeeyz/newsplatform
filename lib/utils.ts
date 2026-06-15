import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCategory(category: string): string {
  if (!category) return "";
  const lower = category.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
