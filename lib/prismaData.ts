"use server";
import { appSession } from "@/definition/types";
import prisma from "./prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const t = await getTranslations("error");

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
export async function createQuiz(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
  });
  const data = schema.parse({
    name: formData.get("name"),
  });
  let res;
  try {
    res = await prisma.quiz.create({
      data,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { message: t(e.code) };
    }
    return { message: "Désolé, je n'ai pas réussi à créer ce quiz" };
  }
  revalidatePath("/");
  redirect(`/qpuc/admin/quiz/${res.id}`);
}

export async function updateQuiz(
  ids: { quizId: string },
  prevState: {
    message: string;
    error: string;
  },
  formData: FormData
) {
  const schema = z.object({
    name: z.string().min(1),
  });
  const data = schema.parse({
    name: formData.get("name"),
  });
  try {
    await prisma.quiz.update({
      where: {
        id: ids.quizId,
      },
      data,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { message: t(e.code), error: "NOT_UNIQUE" };
    }
    return {
      message: "Désolé, je n'ai pas réussi à créer ce quiz",
      error: "UKN_ERROR",
    };
  }
  revalidatePath(`/qpuc/admin/quiz/${ids.quizId}`);
  return { message: "", error: "" };
}

export async function deleteQuiz(id: string) {
  await prisma.quiz.delete({
    where: {
      id,
    },
  });
}

export async function deleteQuestion(id: string, quizId: string) {
  try {
    await prisma.question.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return { message: t(e.code), error: "NOT_UNIQUE" };
    }
    return {
      message: "Désolé, je n'ai pas réussi à créer ce quiz",
      error: "UKN_ERROR",
    };
  }
  revalidatePath(`/qpuc/admin/quiz/${quizId}`);
  return { message: "" };
}
export async function upsertQuestion() {}
