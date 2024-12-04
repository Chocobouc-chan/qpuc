import { authOptions } from "@/auth.config";
import { getTwitchClips } from "@/lib/twitchData";
import Home from "@/ui/Home";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { appSession } from "@/definition/types";
import { createOrUpdateUser } from "@/lib/prismaData";

export default async function Page() {
  const session: appSession | null = await getServerSession(authOptions);
  let clips = [];

  //TODO remove and add proper error handling
  if (session && session.user) {
    clips = await getTwitchClips();
    await createOrUpdateUser(session);
    if (clips) {
      return (
        <div className="flex flex-col items-center justify-center mt-4">
          <Home session={session} clips={clips} />
        </div>
      );
    } else {
      return null;
    }
  } else {
    redirect("/");
  }
}
