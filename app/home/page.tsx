"use client";
export interface SessionTwitch {
  user: {
    name: string;
    email: string;
    image: string;
  };
  access_token: string;
  providerAccountId: string;
}

import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col items-center justify-center">
        <img
          src={session?.user?.image}
          width={150}
          height={150}
          className="hidden md:block"
          alt="Twitch profile image"
        />
        <p>Bienvenue {session?.user?.name}</p>
        <p className="w-1/2">{JSON.stringify(session)}</p>
        <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
          signout
        </button>
      </div>
    </div>
  );
}
