import Link from "next/link";
import { Frame } from "@/components/Frame";
import { listBriefs } from "@/lib/briefs";
import { auth, publicPreview } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ArchivePage() {
  const session = publicPreview ? null : await auth();
  if (!publicPreview && !session?.user) redirect("/login");
  const briefs = listBriefs();
  return (
    <Frame active="archive" user={session?.user?.name || session?.user?.email || null}>
      <p className="kicker">Index</p>
      <h1 className="headline">Archive</h1>
      <p className="lede">Every Sunday drop, oldest at the bottom.</p>
      <ul className="archive">
        {briefs.map((b) => (
          <li key={b.slug}>
            <Link href={`/archive/${b.slug}`}>
              <div className="when">{b.published}</div>
              <h2>{b.title}</h2>
              <p>{b.lede}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
