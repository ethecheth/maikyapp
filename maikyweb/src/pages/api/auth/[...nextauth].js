import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password", placeholder: "Your password" }
      },
      async authorize(credentials) {
        /*
        // Replace this with your actual login logic
        const user = { id: 1, name: "John Doe", email: "johndoe@example.com" };

        // For example, you could look up the user in your database and check the password
        if (credentials.username === "admin" && credentials.password === "admin") {
          return user;
        } else {
          return null; // Return null if login fails
        }
          */
        try {
          // Replace with your API endpoint for login
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          // If the API returns a successful response with user data
          if (res.ok && user) {
            return user;
          } else {
            throw new Error("Invalid username or password");  // Throw error for invalid credentials
          }
        } catch (error) {
          if (error.name === "SyntaxError") {
            throw new Error("The server returned an unexpected response. Please try again later.");
          } else {
            throw new Error(error.message || "Login failed");
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token if available 
      if (user) {
        token.id = user.id;
        token.name = `${user.user.name} ${user.user.lname}`;
        token.email = user.user.email;
        token.user = user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      session.userobj = token.user;
      session.token = token.token; // Ensure this is added if needed
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect users to the base URL if no URL is provided
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Path to your login page
    signOut: "/login", // Redirect here after sign out
    error: "/login", // Error page
    verifyRequest: "/verify-request",  // (Optional)
    newUser: "/welcome",  // (Optional)
  },
  //secret: process.env.NEXTAUTH_SECRET,
});
