import { AuthForm } from "@/modules/auth/components/auth-form";

export default function Page() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <AuthForm mode="sign-in" />
    </main>
  );
}
