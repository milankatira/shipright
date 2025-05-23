"use server";

import prisma from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncUserInDb() {
  const auth = await currentUser();
  if (!auth?.id) return;
  const user = await prisma.user.findFirst({
    where: { externalId: auth.id },
  });

  if (!user) {
    return await prisma.user.create({
      data: {
        externalId: auth?.id,
        email: auth.emailAddresses[0].emailAddress!,
      },
    });
  }

  return user;
}