"use client";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { BsTwitch } from "react-icons/bs";

export default function TwitchAuthButton() {
  const t = useTranslations("login");
  return (
    <>
      <button
        className="btn-primary flex flex-row items-center"
        onClick={() => signIn("twitch", { callbackUrl: "/qpuc" })}
      >
        <BsTwitch className="h-12 w-12 mr-2" />
        <span>{t("twitch_button")}</span>
      </button>
    </>
  );
}
