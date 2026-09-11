import { Frame } from "@/components/Frame";
import { BriefView } from "@/components/BriefView";
import { getBrief, listBriefs } from "@/lib/briefs";
import { auth, publicPreview } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export function generateStaticParams() {
  return listBriefs().map((b) => ({ slug: b.slug }));
}

export default async function BriefPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = publicPreview ? null : await auth();
  if (!publicPreview && !session?.user) redirect("/login");
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) notFound();
  return (
    <Frame active="archive" user={session?.user?.name || session?.user?.email || null}>
      <BriefView brief={brief} />
    </Frame>
  );
}
