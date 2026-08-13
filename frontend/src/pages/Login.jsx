import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login successful");

      window.location.href = "/dashboard";

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-blue-500">
            Shortly
          </h1>

          <h2 className="mt-6 text-2xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-slate-400">
            Login to manage your shortened links.
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-400 hover:underline"
            >
              Register
            </a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;