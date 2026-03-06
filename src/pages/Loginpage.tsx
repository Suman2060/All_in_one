import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { loginSchema } from "@/schema/auth.schema";
import type { LoginFormData } from "@/schema/auth.schema";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  const { handleLogin, isLoading, error, isLoggedIn } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin(data); 
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">You're already logged in!</p>
          <Link to="/" className="mt-4 inline-block text-indigo-600 underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-16">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-extrabold">
            All<span className="text-indigo-600">-In-</span>One
          </Link>
          <h1 className="text-xl font-bold text-slate-900 mt-4">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <input
              {...register("username")} 
              type="text"
              placeholder="e.g. mor_2314"
              className={`px-4 py-2.5 border rounded-xl text-sm outline-none
                focus:ring-2 focus:ring-indigo-500 transition
                ${errors.username ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
            />

            {errors.username && (
              <p className="text-xs text-rose-500">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPass ? "text" : "password"} 
                placeholder="Your password"
                className={`w-full px-4 py-2.5 pr-10 border rounded-xl text-sm
                  outline-none focus:ring-2 focus:ring-indigo-500 transition
                  ${errors.password ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600
              hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-semibold py-3 rounded-xl transition-all mt-2"
          >
            <LogIn size={16} />
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="mt-6 bg-slate-50 rounded-xl p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-2">Test credentials:</p>
          <div className="flex flex-col gap-1">
            <p>Username: <span className="font-mono text-indigo-600">mor_2314</span></p>
            <p>Password: <span className="font-mono text-indigo-600">83r5^_</span></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;