"use client";

import QuestionsList from "@/components/QuestionsList";
import QuizTitle from "@/components/QuizTitle";
import {
  QuizWithDependencies,
  QuestionWithDependencies,
} from "@/definition/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function QuizDetails({
  currentQuiz,
}: {
  currentQuiz: QuizWithDependencies | null;
}) {
  const t = useTranslations("admin.quiz.details");
  const [currentQuestion, setCurrentQuestion] = useState<
    QuestionWithDependencies | undefined
  >(undefined);

  function onCreateQuestion() {
    setCurrentQuestion({ quizId: currentQuiz?.id } as QuestionWithDependencies);
  }

  function onEdit(id: string) {
    setCurrentQuestion(
      currentQuiz?.questions?.find((question) => question.id === id)
    );
  }

  function closeQuestionEdition() {
    setCurrentQuestion(undefined);
  }

  return (
    <>
      <div className="h-screen w-full">
        <div className="flex flex-col p-2">
          <QuizTitle quizName={currentQuiz?.name!} />
          <div className="mt-4">
            <QuestionsList
              questions={currentQuiz?.questions!}
              onEdit={onEdit}
            />
          </div>
          <button
            className="btn-primary w-48 self-center mt-4"
            onClick={onCreateQuestion}
          >
            {t("add_button")}
          </button>
        </div>
      </div>

      <div className="w-full h-screen pt-5 pl-5">
        {currentQuestion && (
          <>
            <p>Question séléctionée:{currentQuestion.question}</p>
            <button className="btn-secondary" onClick={closeQuestionEdition}>
              Fermer la question
            </button>
          </>
        )}
      </div>
    </>
  );
}
