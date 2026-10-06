import { isPlaceholder } from "@/lib/site";

/** Prints a fact from the data file, highlighting it if it is still a placeholder. */
export default function Value({ children }: { children: string }) {
  if (isPlaceholder(children)) return <span className="placeholder">{children}</span>;
  return <>{children}</>;
}
