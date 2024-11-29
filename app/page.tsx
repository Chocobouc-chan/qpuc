import { authOptions } from "@/auth.config";
import TwitchAuthButton from "@/components/TwitchAuthButton";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/qpuc");
  const t = await getTranslations("login");
  return (
    <div className="w-screen h-screen animated-background bg-gradient-to-br from-blue-500 via-blue-500 to-violet-700">
      <div className="w-screen flex justify-center">
        <span className="text-5xl mt-20">{t("title")}</span>
      </div>
      <div className="w-screen h-5/6 flex justify-center items-center">
        <TwitchAuthButton />
      </div>
    </div>
  );
}
