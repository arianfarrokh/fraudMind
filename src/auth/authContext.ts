// context/authContext.ts
"use client";

import { useState, useEffect } from "react";

// ساختار token
interface AuthContextType {
  token: string | null;
}

export function authContext(): AuthContextType {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return { token };
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      setToken(t);
    }
  }, []);

  return { token, setToken };
}
