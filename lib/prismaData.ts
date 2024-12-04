"use server";
import { appSession } from "@/definition/types";
import prisma from "./prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
// User
export async function createOrUpdateUser(session: appSession) {
  await prisma.user.upsert({
    where: {
      twitch_id: session.providerAccountId,
    },
    update: {
      username: session.user.name,
    },
    create: {
      username: session.user.name as string,
      twitch_id: session.providerAccountId as string,
    },
  });
}

// Quiz
export async function createQuiz(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
  });
  const data = schema.parse({
    name: formData.get("name"),
  });
  try {
    await prisma.quiz.create({
      data,
    });
    revalidatePath("/");
    return { message: "Created new quiz" };
  } catch (e) {
    return { message: "Failed to create new quiz" };
  }
}

export async function updateQuiz(name: string, id: string) {
  await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteQuiz(id: string) {
  await prisma.quiz.delete({
    where: {
      id,
    },
  });
}

export async function upsertQuestion() {}
