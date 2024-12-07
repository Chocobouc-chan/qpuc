import type { QuizWithDependencies } from "@/definition/types";
import prisma from "@/lib/prisma";
import QuizDetails from "@/ui/QuizDetails";

export default async function Quiz({
  params,
}: {
  params: Promise<{ quizid: string }>;
}) {
  const { quizid } = await params;
  const currentQuiz: QuizWithDependencies | null = await prisma.quiz.findUnique(
    {
      include: { questions: { include: { answer: true } } },
      where: { id: quizid },
    }
  );
  return (
    <div className="w-screen h-screen flex flex-row items-center divide-x break-words">
      <QuizDetails currentQuiz={currentQuiz} />
    </div>
  );
}
