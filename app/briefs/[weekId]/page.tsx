import { BriefView } from "@/components/BriefView";
import { Frame } from "@/components/Frame";
import { requireBriefAccess } from "@/lib/access";
import { getBrief, listBriefs } from "@/lib/briefs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return listBriefs().map((brief) => ({ weekId: brief.weekId }));
}

export default async function BriefPage({
  params
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { user } = await requireBriefAccess();
  const { weekId } = await params;
  const brief = getBrief(weekId);
  if (!brief) notFound();

  return (
    <Frame active="archive" user={user}>
      <BriefView brief={brief} />
    </Frame>
  );
}
