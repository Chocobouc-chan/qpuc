import { Answer, Question } from "@prisma/client";
import { Session } from "next-auth";

export type appSession = Session & {
  user: { name: string; mail: string; image: string };
  providerAccountId: string;
};
// add missing relations to prisma generated types
// TODO extend prisma types
export type QuizWithDependencies = {
  id: string;
  name: string;
  questions?: QuestionWithDependencies[];
};

export type QuestionWithDependencies = {
  question: string;
  id: string;
  question_type: string;
  points: number;
  author: string;
  media1: string;
  media2: string;
  media3: string;
  quizId: string;
  used: boolean;
  answer: Answer[];
};
