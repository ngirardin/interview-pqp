import { cookies } from "next/headers";

import prisma from "../db";
import { getSessionOrRedirect } from "./getSessionOrRedirect";

export const destroySession = async () => {
  const user = await getSessionOrRedirect();

  if (user === undefined) {
    return;
  }

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      session: null,
    },
  });

  cookies().delete("session");
};
