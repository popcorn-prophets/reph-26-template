import Link from "next/link";

// One line per feature page. Add yours here.
const nav = [{ href: "/", label: "Home" }];

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-6">
        <Link href="/" className="font-semibold">
          REPH 26
        </Link>
        <nav className="text-muted-foreground flex flex-1 items-center gap-4 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Optional auth: <UserMenu /> from @/modules/auth/components/user-menu */}
      </div>
    </header>
  );
}
