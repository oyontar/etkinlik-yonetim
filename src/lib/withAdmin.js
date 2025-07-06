"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export function withAdmin(Component) {
  return function Wrapped(props) {
    const { data: session, status } = useSession();
    useEffect(() => {
      if (status === "unauthenticated" || session?.user.role !== "ADMIN") {
        signIn(); // signin sayfasına yönlendir
      }
    }, [session, status]);

    if (status !== "authenticated" || session.user.role !== "ADMIN") {
      return <p>Yönlendiriliyorsunuz…</p>;
    }
    return <Component {...props} />;
  };
}
