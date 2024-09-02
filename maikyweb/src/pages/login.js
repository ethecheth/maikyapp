import { signIn, getCsrfToken } from "next-auth/react";
import { useState } from "react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa"; // Import icons

export default function Login({ csrfToken }) {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const username = e.target.username.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/dashboard",
    });

    if (!result.ok) {
      console.error("Failed to sign in:", result.error);
      setError(result.error || "Login failed, please check your credentials.");
    } else {
      window.location.href = result.url;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              type="text"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mb-4 flex items-center justify-center space-x-2">
            <FaSignInAlt className="h-5 w-5 text-white" /> {/* Icon added here */}
            <span>Sign In</span>
          </button>
        </form>
        <button
          className="btn btn-outline w-full flex items-center justify-center space-x-2"
          onClick={() => window.location.href = "/register"}
        >
          <FaUserPlus className="h-5 w-5 text-gray-700" /> {/* Icon added here */}
          <span>Register</span>
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
