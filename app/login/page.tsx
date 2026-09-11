import { Frame } from "@/components/Frame";
import { signIn, authConfigured, publicPreview } from "@/lib/auth";

export default function LoginPage() {
  async function github() {
    "use server";
    await signIn("github", { redirectTo: "/" });
  }

  return (
    <Frame active="login">
      <div className="login">
        <p className="kicker">Access</p>
        <h1 className="headline">Sign in with GitHub</h1>
        <p className="lede">
          Allowlist is balug87 plus any login added to GITHUB_ALLOWLIST. This is
          not a public magazine.
        </p>
        {authConfigured ? (
          <form action={github}>
            <button className="btn" type="submit">
              Continue with GitHub
            </button>
          </form>
        ) : (
          <p className="lede">
            GitHub OAuth is not configured on this deploy.
            {publicPreview
              ? " Preview mode is on — use Latest and Archive without a login."
              : " Set AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, and AUTH_SECRET on Vercel."}
          </p>
        )}
      </div>
    </Frame>
  );
}
