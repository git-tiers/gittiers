import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    loginId: string;
    expires: string;
    user: {
      email: string;
      image: string;
      name: string;
    }
  }
}
