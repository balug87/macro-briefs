import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Only these GitHub logins can sign in. Default is the repo owner.
const allowlist = (process.env.GITHUB_ALLOWLIST || "balug87")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export const authConfigured = Boolean(
  process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
);

export const publicPreview = process.env.PUBLIC_PREVIEW === "1" || !authConfigured;

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "preview-only-replace-on-vercel",
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ profile }) {
      const login = String(
        (profile as { login?: string } | undefined)?.login || ""
      ).toLowerCase();
      return allowlist.includes(login);
    },
    async session({ session }) {
      return session;
    }
  }
});
