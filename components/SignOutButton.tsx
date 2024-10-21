"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

type Props = {
  onLogout: () => Promise<void>;
};
export function SignOutButton(props: Props) {
  const router = useRouter();

  const handleSignOut = async () => {
    await props.onLogout();

    router.refresh();
    router.push("/account/signin");
  };

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  );
}
