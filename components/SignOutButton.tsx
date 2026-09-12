import { signOut } from "@/lib/auth";

// Server action so Sign out does not need a client session provider.
export function SignOutButton() {
  async function logout() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <form action={logout}>
      <button className="signout" type="submit">
        Sign out
      </button>
    </form>
  );
}
