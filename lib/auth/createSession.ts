import crypto from "crypto";
import { cookies } from "next/headers";

import prisma from "@/lib/db";

export const createSession = async (email: string, password: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user === null) {
    return false;
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  if (hashedPassword !== user.hash) {
    return false;
  }

  const session = crypto.randomUUID();

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      session,
    },
  });

  cookies().set("session", session);

  return true;
};
