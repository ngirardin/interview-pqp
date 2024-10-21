import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSession } from "@/lib/auth/createSession";

type Props = {
  searchParams: {
    error?: string;
  };
};

export default async function SigninPage(props: Props) {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const isValid = await createSession(email, password);

    if (!isValid) {
      redirect("/account/signin?error=invalid");
    }

    redirect("/");
  };

  return (
    <div>
      <h1 className="text-xl">Signin</h1>

      {props.searchParams.error === "invalid" && <p className="text-red-500">Invalid email or password</p>}

      <form action={handleLogin} className="space-y-4">
        <Input type="email" name="email" />

        <Input type="password" name="password" />

        <Button type="submit">Signin</Button>
      </form>
    </div>
  );
}
