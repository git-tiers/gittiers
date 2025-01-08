import GitHubProvider from "next-auth/providers/github";
import NextAuth from 'next-auth';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: "read:user repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        const res = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });
        if (res.ok) {
          const user = await res.json();
          token.loginId = user?.login;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.loginId = token.loginId as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  }
})

export { handler as GET, handler as POST }
