import { CreateNextAuthUserByEmail, GetNextAuthUserByEmail } from "#/services";
import { graphcms } from "#/services/_graphcms";
import { compare, hash } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jamie@hygraph.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        },
      },
      authorize: async (credentials: any) => {
        const { email, password } = credentials;

        const user  = await GetNextAuthUserByEmail(email);

        if (!user) {
          const newUser  = await CreateNextAuthUserByEmail({email, password})

          return {
            id: newUser.id,
            email,
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Displays signin buttons
    signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
});
