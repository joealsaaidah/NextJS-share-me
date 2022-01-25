import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SanityAdapter } from "next-auth-sanity";
import { client } from "../../../utils/client";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  adapter: SanityAdapter(client),
  session: {
    jwt: true,
  },
});
