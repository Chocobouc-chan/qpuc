import { authOptions } from "@/auth.config";
import { getTwitchClips } from "@/lib/twitchData";
import Home from "@/ui/Home";
import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const clips = await getTwitchClips(session);
  return (
    <div className="w-full h-full animated-background bg-gradient-to-br from-blue-500 via-blue-500 to-violet-700 overflow-scroll ">
      <div className="flex flex-col items-center justify-center ">
        <Home session={session} clips={clips} />
      </div>
    </div>
  );
}
