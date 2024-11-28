"use server";
import { Session } from "next-auth";
export async function getTwitchClips(session: Session) {
  const res = await fetch(
    `${process.env.TWITCH_URL_API}/clips?broadcaster_id=${process.env.TWITCH_ID_BASHCLUB}`,
    {
      headers: {
        "Client-Id": `${process.env.TWITCH_ID}`,
        Authorization: "Bearer " + session.access_token,
      },
    }
  );
  const data = await res.json();
  return data;
}
