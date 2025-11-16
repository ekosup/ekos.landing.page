"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isLogin, setIsLogin] = useState(true);
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const { login, register } = useAuth();
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
   if (isLogin) {
    await login({ email, password });
    router.push("/quizzes");
   } else {
    await register({ email, password });
    setError("Registration successful! Please login.");
    setIsLogin(true);
   }
  } catch (err: unknown) {
   const error = err as { response?: { data?: { error?: string } } };
   setError(error.response?.data?.error || "An error occurred");
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <Card className="w-full max-w-md">
    <CardHeader>
     <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
     <CardDescription>
      {isLogin ? "Sign in to your account" : "Create a new account"}
     </CardDescription>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleSubmit} className="space-y-4">
      <div>
       <Label htmlFor="email">Email</Label>
       <Input
        id="email"
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setEmail(e.target.value)
        }
        required
       />
      </div>
      <div>
       <Label htmlFor="password">Password</Label>
       <Input
        id="password"
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
         setPassword(e.target.value)
        }
        required
       />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <Button type="submit" className="w-full" disabled={isLoading}>
       {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
      </Button>
     </form>
     <div className="mt-4 text-center">
      <button
       type="button"
       onClick={() => setIsLogin(!isLogin)}
       className="text-sm text-blue-600 hover:text-blue-500"
      >
       {isLogin
        ? "Need an account? Register"
        : "Already have an account? Login"}
      </button>
     </div>
     <div className="mt-4 text-center">
      <Link href="/" className="text-sm text-gray-600 hover:text-gray-500">
       Back to Home
      </Link>
     </div>
    </CardContent>
   </Card>
  </div>
 );
}
