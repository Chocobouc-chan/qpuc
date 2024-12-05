"use client";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const t = useTranslations("admin.dashboard");
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div>
        <button
          className="btn-primary"
          onClick={() => redirect("/qpuc/admin/quiz/create")}
        >
          {t("create_new_quiz")}
        </button>
      </div>
    </div>
  );
}
