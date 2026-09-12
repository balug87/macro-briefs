import { BriefView } from "@/components/BriefView";
import { Frame } from "@/components/Frame";
import { requireBriefAccess } from "@/lib/access";
import { latestBrief } from "@/lib/briefs";

export default async function LatestPage() {
  const { user } = await requireBriefAccess();
  const brief = latestBrief();

  return (
    <Frame active="latest" user={user}>
      {brief ? <BriefView brief={brief} /> : <p className="empty">No brief on file yet.</p>}
    </Frame>
  );
}
