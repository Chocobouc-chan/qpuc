import { authOptions } from "@/auth.config";
import { getTwitchClips } from "@/lib/twitchData";
import Home from "@/ui/Home";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session:
    | (Session & { access_token: string; providerAccountId: string })
    | null = await getServerSession(authOptions);
  let clips = [];

  //TODO remove and add proper error handling
  if (session) {
    clips = await getTwitchClips();
    if (clips) {
      return (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-fuchsia-700 overflow-y-hidden ">
          <div className="flex flex-col items-center justify-center mt-4">
            <Home session={session} clips={clips} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  } else {
    redirect("/");
  }
}
