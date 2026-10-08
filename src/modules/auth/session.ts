import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./server";

/** Current session or null. Safe to call anywhere on the server. */
export async function getSession() {
  return getAuth().api.getSession({ headers: await headers() });
}

/** Use at the top of a page/action to require login. Redirects to /sign-in. */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session.user;
}
