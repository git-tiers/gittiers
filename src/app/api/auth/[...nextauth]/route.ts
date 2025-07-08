import GitHubProvider from "next-auth/providers/github";
import NextAuth from 'next-auth';
import { firestore } from '../../../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

            if(userData?.login){
              try{
                const userRef = doc(firestore, 'users', userData.login);
                const userDoc = await getDoc(userRef);
                if(!userDoc.exists()){
                  await setDoc(userRef, {
                    login_id: userData.login,
                    access_token: account.access_token,
                    first_login: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                  })
                }else{
                  await setDoc(userRef, {
                    last_login: new Date().toISOString(),
                  }, { merge: true });
                }

              }catch(firebaseError){
                console.error('Firebase 처리 중 오류:', firebaseError);
              }
            }
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
