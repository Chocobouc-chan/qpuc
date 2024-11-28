"use client";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function Home() {
  const t = useTranslations("home");
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="w-screen h-screen ">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={session.user!.image!}
            width={150}
            height={150}
            className="hidden md:block rounded-full"
            alt="Twitch profile image"
          />
          <p>{t("welcome", session?.user)}</p>
          <p className="w-1/2">{JSON.stringify(session)}</p>
          <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
            signout
          </button>
        </div>
      </div>
    );
  } else return null;
}

/* export interface SessionTwitch {
  user: {
    name: string;
    email: string;
    image: string;
  };
  access_token: string;
  providerAccountId: string;
} */
