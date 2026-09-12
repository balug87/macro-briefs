import { ArchiveIndex } from "@/components/ArchiveIndex";
import { Frame } from "@/components/Frame";
import { requireBriefAccess } from "@/lib/access";
import { listBriefs } from "@/lib/briefs";

export default async function ArchivePage() {
  const { user } = await requireBriefAccess();
  const briefs = listBriefs();

  return (
    <Frame active="archive" user={user}>
      <p className="kicker">Index</p>
      <h1 className="headline">Archive</h1>
      <p className="lede">Every Sunday drop, newest year first.</p>
      <ArchiveIndex briefs={briefs} />
    </Frame>
  );
}
