import { Frame } from "@/components/Frame";
import { BriefView } from "@/components/BriefView";
import { latestBrief } from "@/lib/briefs";
import { auth, publicPreview } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = publicPreview ? null : await auth();
  if (!publicPreview && !session?.user) redirect("/login");
  const brief = latestBrief();
  return (
    <Frame active="latest" user={session?.user?.name || session?.user?.email || null}>
      {brief ? (
        <BriefView brief={brief} />
      ) : (
        <p className="lede">No brief on file yet.</p>
      )}
    </Frame>
  );
}
