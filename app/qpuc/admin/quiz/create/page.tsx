"use client";
import { createQuiz } from "@/lib/prismaData";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function CreateQuiz() {
  const t = useTranslations("admin.quiz.create");
  const [state, formAction] = useActionState(createQuiz, initialState);
  const { pending } = useFormStatus();
  return (
    <div className="w-screen h-screen">
      <form action={formAction}>
        <label htmlFor="quiz">{t("label")}</label>
        <input
          className="text-black"
          type="text"
          id="quiz"
          name="name"
          placeholder={t("placeholder")}
          required
        />
        <button type="submit" aria-disabled={pending}>
          {t("button")}
        </button>
        <p>{state?.message}</p>
      </form>
    </div>
  );
}
