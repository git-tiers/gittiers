import GitHubProvider from "next-auth/providers/github";
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    })
  ],
  callbacks: {

  },
})

export { handler as GET, handler as POST }