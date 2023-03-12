import NextAuth, { Credentials } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials: Credentials) {
        // Add custom logic here to authorize user
        // For example, compare credentials with database
        // and return user object if credentials are valid
        const user = { id: 1, name: "John Doe", email: credentials.email };
        return user;
      }
    }),
  ],
});
