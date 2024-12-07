"use client";

import { useActionState, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { updateQuiz } from "@/lib/prismaData";
import { useParams } from "next/navigation";

const initialState = {
  message: "",
  error: "",
};

export default function QuizTitle({ quizName }: { quizName: string }) {
  const params = useParams<{ quizid: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuizName, setCurrentQuizName] = useState(quizName);

  const [state, formAction, pending] = useActionState(
    updateQuiz.bind(null, { quizId: params.quizid }),
    initialState
  );

  useEffect(() => {
    if (state?.error) {
      setIsEditing(true);
    } else setIsEditing(false);
  }, [state]);

  if (!isEditing) {
    return (
      <div>
        <button
          className="flex flex-row items-center gap-3"
          onClick={() => setIsEditing(true)}
        >
          <span className="text-5xl">Quiz : {quizName}</span>
          <LuPencil size={30} color="#eab308" />
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
        <form action={formAction} className="flex items-center gap-4">
          <label htmlFor="name">Modifier le nom du quiz : </label>
          <input
            className="input-primary flex-shrink w-1/2 self-center"
            value={currentQuizName}
            id="quizName"
            name="name"
            onChange={(value) => setCurrentQuizName(value.target.value)}
            required
            autoFocus
          ></input>
          <button className="p-2" type="submit" aria-disabled={pending}>
            <FaCheck color="#16a34a" />
          </button>
        </form>
        <p aria-live="polite">{state?.message}</p>
      </div>
    );
  }
}
