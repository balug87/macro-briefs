import Link from "next/link";
import { publicPreview } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

// Shared chrome for every screen: wordmark, nav, optional preview note, footer.
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
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="mast">
        <Link className="wordmark" href="/">
          Planet Brief
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/" data-active={active === "latest"}>
            Latest
          </Link>
          <Link href="/briefs" data-active={active === "archive"}>
            Archive
          </Link>
          {user ? (
            <>
              <span className="nav-user">{user}</span>
              <SignOutButton />
            </>
          ) : (
            <Link href="/login" data-active={active === "login"}>
              Sign in
            </Link>
          )}
        </nav>
      </header>
      {publicPreview ? (
        <p className="banner">
          Preview mode — briefs are readable until GitHub OAuth env vars are set
        </p>
      ) : null}
      <main id="main">{children}</main>
      <footer className="foot">
        <span>World Monitor grounded · Sunday 09:00 · Europe/Prague</span>
        <span>v1 · Latest + Archive</span>
      </footer>
    </div>
  );
}
