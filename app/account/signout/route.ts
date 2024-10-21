import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { destroySession } from "@/lib/auth/destroySession";
import { getSessionOrRedirect } from "@/lib/auth/getSessionOrRedirect";

export async function GET() {
  const user = await getSessionOrRedirect();

  if (!user) {
    redirect("/account/signin");
  }

  await destroySession();

  revalidatePath("/");

  redirect("/account/signin");
}
