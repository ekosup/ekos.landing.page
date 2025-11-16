"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, authApi, RegisterData, LoginData } from "./auth-api";

interface AuthContextType {
 user: User | null;
 isLoading: boolean;
 login: (data: LoginData) => Promise<void>;
 register: (data: RegisterData) => Promise<void>;
 logout: () => Promise<void>;
 checkAuth: () => Promise<void>;
 hasRole: (role: string) => boolean;
 isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
};

interface AuthProviderProps {
 children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 const queryClient = useQueryClient();
 const [hasToken, setHasToken] = useState(
  () => (typeof window !== 'undefined' ? !!localStorage.getItem("auth_token") : false)
 );

 useEffect(() => {
  if (typeof window !== 'undefined') {
   const token = localStorage.getItem("auth_token");
   setHasToken(!!token);
  }
 }, []);

 const { data: user, isLoading } = useQuery({
  queryKey: ["user"],
  queryFn: () => authApi.getMe(),
  retry: 1,
  staleTime: 5 * 60 * 1000, // 5 minutes
  enabled: hasToken,
 });
 const loginMutation = useMutation({
  mutationFn: authApi.login,
  onSuccess: (response) => {
   const token = response.session_token || response.token;
   if (token) {
    localStorage.setItem("auth_token", token);
    setHasToken(true);
    queryClient.invalidateQueries({ queryKey: ["user"] }); // Refetch user data
   }
  },
 });
 const registerMutation = useMutation({
  mutationFn: authApi.register,
 });

 const logoutMutation = useMutation({
  mutationFn: authApi.logout,
  onSuccess: () => {
   localStorage.removeItem("auth_token");
   setHasToken(false);
   queryClient.setQueryData(["user"], null); // Clear user data
  },
 });
 const login = async (data: LoginData) => {
  await loginMutation.mutateAsync(data);
 };

 const register = async (data: RegisterData) => {
  await registerMutation.mutateAsync(data);
 };

 const logout = async () => {
  try {
   await logoutMutation.mutateAsync();
  } catch (_error) {
   // Even if logout fails, clear local state
   localStorage.removeItem("auth_token");
   setHasToken(false);
   queryClient.setQueryData(["user"], null);
  }
 };

 const checkAuth = async () => {
  queryClient.invalidateQueries({ queryKey: ["user"] });
 };

 const hasRole = (role: string) => {
  return user?.roles?.includes(role) ?? false;
 };

 const isAdmin = () => {
  return hasRole("admin") || hasRole("admin_quiz");
 };

 const value: AuthContextType = {
  user: user || null,
  isLoading,
  login,
  register,
  logout,
  checkAuth,
  hasRole,
  isAdmin,
 };

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
