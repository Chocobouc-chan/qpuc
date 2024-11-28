import { authOptions } from "@/auth.config";
import { getTwitchClips } from "@/lib/twitchData";
import Home from "@/ui/home";
import { getServerSession } from "next-auth/next";

export default async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    const clips = await getTwitchClips(session);
    return (
      <div className="w-screen h-screen ">
        <div className="flex flex-col items-center justify-center">
          <Home session={session} clips={clips} />
        </div>
      </div>
    );
  } else return null;
};

/* export interface SessionTwitch {
  user: {
    name: string;
    email: string;
    image: string;
  };
  access_token: string;
  providerAccountId: string;
} */
