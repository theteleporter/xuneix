import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
      // Clipboard API if available
      return navigator.clipboard.writeText(text);
  } else {
      // Fallback method (older browsers or some mobile devices)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
          document.execCommand('copy');
          return Promise.resolve();
      } catch (err) {
          console.error('Fallback copy failed:', err);
          return Promise.reject(err);
      } finally {
          document.body.removeChild(textArea);
      }
  }
};

