import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  //callbacks - executed after succesful authentication
  callbacks: {
    async signIn({ user: {name, email, image}, account, profile: {id, login, bio} }) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      }); //profile id coming from github oauth

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio,
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      //if account and profile exists, get user from sanity
      if(account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });
        token.id = user?._id;
        // It will allow us to connect a github user with a sanity author that can later on create startups
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, {id: token.id});  // token.id has user id from jwt callback so we're assigning it to session
      return session;
    },
  },
} );
