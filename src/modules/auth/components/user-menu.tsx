"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "../client";

/** Optional: drop into any layout/header. */
export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return null;
  if (!session)
    return (
      <Link href="/sign-in" className={buttonVariants({ size: "sm", variant: "outline" })}>
        Sign in
      </Link>
    );
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{session.user.name}</span>
      <Button
        size="sm"
        variant="outline"
        onClick={async () => {
          await authClient.signOut();
          router.refresh();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
