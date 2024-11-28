"use server";
import { Session } from "next-auth";
import Image from "next/image";

export default async function TwitchEmbeding({ clips }: { clips: any }) {
  /*   const isStreaming = useIsStreaming();*/

  return (
    <>
      {/* add logic to check if stream is actually running, if true return player, else return clips collection*/}
      {/* <TwitchPlayer channel="bashclub" /> */}
      {clips.data.map((clip) => {
        return (
          <>
            <Image
              src={clip.thumbnail_url}
              width={150}
              height={150}
              className="hidden md:block"
              alt={`Clip from BashClub channel ${clip.id}`}
              key={clip.id}
            />
            <iframe
              src={`${clip.embed_url}&autoplay=true&muted=false&parent=${process.env.TWITCH_PARENT}`}
              className="w-4/6 aspect-video"
              allowFullScreen
            />
          </>
        );
      })}
    </>
  );
}
