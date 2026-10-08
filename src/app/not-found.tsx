import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4 p-6">
      <h2 className="text-xl font-semibold">Page not found</h2>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Back home
      </Link>
    </div>
  );
}
