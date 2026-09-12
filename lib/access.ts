import { auth, authConfigured, publicPreview } from "@/lib/auth";
import { redirect } from "next/navigation";

// Shared gate for Latest / Archive / Detail.
// PUBLIC_PREVIEW=1 → pages stay browsable. Anything else denies, including a
// broken or half-deployed OAuth config: fail closed, never open.
export async function requireBriefAccess(): Promise<{ user: string | null }> {
  if (publicPreview) return { user: null };
  if (!authConfigured) redirect("/login");
  const session = await auth();
  if (!session?.user) redirect("/login");
  return { user: session.user.name || session.user.email || null };
}
