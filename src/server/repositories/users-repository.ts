import { PrismaClient } from "@prisma/client";
import { Queue } from "./../../queue/queue";
const prisma = new PrismaClient();

const createUser = (licence, discordId, discordPoints) => {
  const fila = new Queue();
  const data = fila.add({
    license: licence,
    discordId: discordId,
    discordPoints: discordPoints,
  });

  if (data) {
    data.map(async (user) => {
      const userExists = await prisma.user.findUnique({
        where: {
          discordId: user.discordId,
        },
        select: {
          licence: true,
          discordId: true,
          discordPoints: true,
        },
      });
      if (!userExists) {
        return prisma.user.create({
          data: {
            license: user.license,
            discordId: user.discordId,
            discordPoints: user.discordPoints,
            createdAt: new Date().getDate(),
          },
        });
      }
    });
  }
  return;
};

const updateUser = (discordPoints, id) => {
  return prisma.user.update({
    where: {
      discordPoints: discordPoints,
    },
    data: {
      id: id,
      updatedAt: new Date().getDate(),
    },
  });
};
