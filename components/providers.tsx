"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth-context";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
 const [queryClient] = useState(
  () =>
   new QueryClient({
    defaultOptions: {
     queries: {
      retry: 1, // Reduce retries from default 3 to 1
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnReconnect: false, // Don't refetch on reconnect
     },
     mutations: {
      retry: 0, // Don't retry mutations
     },
    },
   })
 );

 return (
  <QueryClientProvider client={queryClient}>
   <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
 );
}
