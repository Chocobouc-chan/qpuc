"use client";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { BsTwitch } from "react-icons/bs";

export default function TwitchAuthButton() {
  const t = useTranslations("login");
  return (
    <>
      <button
        className="rounded-3xl flex flex-row items-center bg-violet-600 p-5 text-gray-50 hover:bg-violet-700 active:bg-violet-800 us:outline-none focus:ring focus:ring-violet-300"
        onClick={() => signIn("twitch", { callbackUrl: "/qpuc" })}
      >
        <BsTwitch className="h-12 w-12 mr-2" />
        <span>{t("twitch_button")}</span>
      </button>
    </>
  );
}
