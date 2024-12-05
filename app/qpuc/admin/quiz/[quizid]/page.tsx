import QuestionsList from "@/components/QuestionsList";
import QuizTitle from "@/components/QuizTitle";
import prisma from "@/lib/prisma";

export default async function Quiz({
  params,
}: {
  params: Promise<{ quizid: string }>;
}) {
  let { quizid } = await params;
  let currentQuiz = await prisma.quiz.findUnique({
    include: { question: { include: { answer: true } } },
    where: { id: quizid },
  });
  return (
    <div className="w-screen h-screen flex flex-row items-center divide-x break-words">
      <div className="h-screen w-1/2 p-5">
        <div className="flex flex-col gap-10">
          <QuizTitle quizName={currentQuiz?.name!} />
          <QuestionsList questions={currentQuiz?.question!} />
          <button className="btn-primary w-48 self-center">
            Ajouter une question
          </button>
        </div>
      </div>
      <div className="w-1/2 h-screen pt-5 pl-5">
        <p>Hello World</p>
      </div>
    </div>
  );
}
