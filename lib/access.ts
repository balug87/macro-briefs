import { auth, publicPreview } from "@/lib/auth";
import { redirect } from "next/navigation";

// Shared gate for Latest / Archive / Detail.
// PUBLIC_PREVIEW=1 or missing GitHub OAuth → pages stay browsable.
export async function requireBriefAccess(): Promise<{ user: string | null }> {
  if (publicPreview) return { user: null };
  const session = await auth();
  if (!session?.user) redirect("/login");
  return { user: session.user.name || session.user.email || null };
}
