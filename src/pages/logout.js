import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function handleSignOut() {
      const data = await signOut({ redirect: false, callbackUrl: "/" });
      if (data.url) {
        // Redirect to sign out URL
        router.push(data.url);
      } else {
        // Redirect to home page
        router.push("/");
      }
    }

    handleSignOut();
  }, []);

  return null;
}
