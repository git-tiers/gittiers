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
          try {
            const userData = await res.json();
            token.loginId = userData?.login || null;
            token.company = userData?.company || null;
            token.location = userData?.location || null;
            token.bio = userData?.bio || null;
          } catch (error) {
            console.error('Failed to parse user data:', error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.loginId = token.loginId as string;
      session.user = {
        ...session.user,
        company: token.company as string | null,
        location: token.location as string | null,
        bio: token.bio as string | null,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  }
})

export { handler as GET, handler as POST }
