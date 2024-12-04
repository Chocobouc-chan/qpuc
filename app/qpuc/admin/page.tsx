"use client";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const t = useTranslations("admin.dashboard");
  return (
    <div className="w-screen h-screen">
      <button
        className="rounded-3xl flex flex-row items-center bg-violet-600 p-5 text-gray-50 hover:bg-violet-700 active:bg-violet-800 us:outline-none focus:ring focus:ring-violet-300"
        onClick={() => redirect("/qpuc/admin/quiz/create")}
      >
        {t("create_new_quiz")}
      </button>
    </div>
  );
}
