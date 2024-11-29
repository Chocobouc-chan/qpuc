import { TwitchClip, TwitchClips } from "@/definition/twitch.api";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

/* TODO switch to livestream if online: 
  https://dev.twitch.tv/docs/api/reference/#get-streams
  GET https://api.twitch.tv/helix/streams?user_id=x if offline, return data :[]

*/

export default function TwitchEmbeding({ clips }: { clips: TwitchClips }) {
  const t = useTranslations("twitchEmbeding");
  const [currentClip, setCurrentClip] = useState<TwitchClip | undefined>();

  clips.data.sort((a: TwitchClip, b: TwitchClip) => {
    if (a.view_count > b.view_count) return -1;
    if (a.view_count < b.view_count) return 1;
    return 0;
  });

  const displayClip = () => {
    if (currentClip) {
      window.scrollTo(0, 0);
      return (
        <>
          <iframe
            src={`${currentClip.embed_url}&autoplay=true&muted=false&parent=${process.env.NEXT_PUBLIC_TWITCH_PARENT}`}
            className="w-1/2 aspect-video transition-all ease-in-out duration-300"
            allowFullScreen={true}
          />
          <button
            className="rounded-3xl mt-2 flex flex-row items-center border-2 border-stone-100 p-5 text-gray-50 hover:bg-violet-700 active:bg-violet-800 us:outline-none"
            onClick={() => setCurrentClip(undefined)}
          >
            {t("closeClip")}
          </button>
        </>
      );
    }
  };

  return (
    <>
      {currentClip && displayClip()}
      <div className="flex flex-row flex-wrap justify-center w-5/6">
        {clips.data.map((clip) => {
          return (
            <div
              className="flex flex-col justify-center w-1/6 m-2 hover:cursor-pointer p-2 border-4 rounded-md border-violet-900 hover:border-violet-400 active:border-violet-200 bg-black"
              key={clip.id}
              onClick={() => setCurrentClip(clip)}
            >
              <Image
                src={clip.thumbnail_url}
                width={240}
                height={136}
                className="hidden md:block self-center"
                alt={`Clip from BashClub channel ${clip.id}`}
              />
              <span className="text-center truncate">{clip.title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
