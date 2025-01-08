import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string; // 커스텀 속성 추가
    expires: string;
    user: {
      email: string;
      image: string;
      name: string;
    }
  }
}