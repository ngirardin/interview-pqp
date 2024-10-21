import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "../db";

export const getSessionOrRedirect = async (): Promise<User> => {
  const session = cookies().get("session");

  if (session === undefined) {
    redirect("/account/signin");
  }

  const user = await prisma.user.findFirst({
    where: {
      session: session.value,
    },
  });

  if (!user) {
    redirect("/account/signin");
  }

  return user;
};
