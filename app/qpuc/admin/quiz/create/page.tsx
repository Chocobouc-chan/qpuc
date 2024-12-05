"use client";
import { createQuiz } from "@/lib/prismaData";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

const initialState = {
  message: "",
};

export default function CreateQuiz() {
  const t = useTranslations("admin.quiz.create");
  const [state, formAction, pending] = useActionState(createQuiz, initialState);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form action={formAction} className="flex flex-col gap-4 w-5/6 md:w-1/3">
        <div className="flex flex-col md:flex-row gap-2 ">
          <label htmlFor="quiz" className="self-center">
            {t("label")}
          </label>
          <input
            className="flex-initial w-full input-primary"
            type="text"
            id="quiz"
            name="name"
            placeholder={t("placeholder")}
            required
          />
        </div>
        <button
          type="submit"
          aria-disabled={pending}
          className="btn-primary w-5-6 md:w-1/3 self-center"
        >
          {t("button")}
        </button>
        <p>{state?.message}</p>
      </form>
    </div>
  );
}
