import { AuthOptions, NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions: AuthOptions = {
  pages: { signIn: "/" },
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID as string,
      clientSecret: process.env.TWITCH_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        access_token: token.access_token,
        providerAccountId: token.providerAccountId,
      };
    },
    async jwt({ token, user, account, profile }) {
      return { ...token, ...account };
    },
  },
} satisfies NextAuthOptions;
