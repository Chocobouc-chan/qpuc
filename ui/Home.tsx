"use client";

import TwitchEmbeding from "@/components/TwitchEmbeding";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home({ session, clips }) {
  const t = useTranslations("home");
  return (
    <>
      <Image
        src={session.user!.image!}
        width={150}
        height={150}
        className="hidden md:block rounded-full"
        alt="Twitch profile image"
      />
      <p>{t("welcome", session?.user)}</p>
      <TwitchEmbeding clips={clips} />
      <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
        signout
      </button>
    </>
  );
}
