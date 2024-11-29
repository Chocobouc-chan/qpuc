import { authOptions } from "@/auth.config";
import { getTwitchClips } from "@/lib/twitchData";
import Home from "@/ui/Home";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  let clips = [];

  //TODO remove and add proper error handling
  if (session) {
    clips = await getTwitchClips(session);

    return (
      <div className="w-full h-full animated-background bg-gradient-to-br from-blue-500 via-blue-500 to-violet-700 overflow-y-hidden ">
        <div className="flex flex-col items-center justify-center mt-4">
          <Home session={session} clips={clips} />
        </div>
      </div>
    );
  } else {
    redirect("/");
  }
}
