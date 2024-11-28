"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { BsTwitch } from "react-icons/bs";
import { useTranslations } from "next-intl";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/qpuc");
  }
  const t = useTranslations("login");
  return (
    <div className="w-screen animated-background h-screen bg-gradient-to-br from-blue-500 via-blue-500 to-violet-700">
      <div className="w-screen flex justify-center">
        <span className="text-5xl mt-20">{t("title")}</span>
      </div>
      <div className="w-screen h-5/6 flex justify-center items-center">
        <button
          className="rounded-3xl flex flex-row items-center bg-violet-600 p-5 text-gray-50 hover:bg-violet-700 active:bg-violet-800 us:outline-none focus:ring focus:ring-violet-300"
          onClick={() => signIn("twitch")}
        >
          <BsTwitch className="h-12 w-12 mr-2" />
          <span>{t("twitch_button")}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
