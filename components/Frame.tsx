import Link from "next/link";
import { publicPreview } from "@/lib/auth";

export function Frame({
  children,
  active,
  user
}: {
  children: React.ReactNode;
  active?: "latest" | "archive" | "login";
  user?: string | null;
}) {
  return (
    <div className="shell">
      <header className="mast">
        <Link className="wordmark" href="/">
          <span>◆</span>Planet Brief
        </Link>
        <nav className="nav">
          <Link href="/" data-active={active === "latest"}>
            Latest
          </Link>
          <Link href="/archive" data-active={active === "archive"}>
            Archive
          </Link>
          {user ? <span>{user}</span> : <Link href="/login">Sign in</Link>}
        </nav>
      </header>
      {publicPreview ? (
        <div className="banner">
          Preview mode — briefs are readable until GitHub OAuth env vars are set
        </div>
      ) : null}
      {children}
      <footer className="foot">
        <span>World Monitor grounded · Sunday 09:00</span>
        <span>v1 · Latest + Archive</span>
      </footer>
    </div>
  );
}
