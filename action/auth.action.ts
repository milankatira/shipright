"use server";

import prisma from "@/lib/prisma";

export async function syncUserInDb(auth: any) {
  const user = await prisma.user.findFirst({
    where: { externalId: auth.id },
  });


  if (!user) {
    await prisma.user.create({
      data: {
        externalId: auth.id,
        email: auth.emailAddresses[0].emailAddress,
      },
    });
  }

  return user;
}
