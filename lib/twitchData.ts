"use server";
export async function getTwitchClips() {
  const res = await fetch(
    `${process.env.TWITCH_URL_API}/clips?broadcaster_id=${process.env.TWITCH_ID_BASHCLUB}&first=100`,
    {
      headers: {
        "Client-Id": `${process.env.TWITCH_ID}`,
        Authorization: "Bearer " + process.env.TWITCH_TOKEN,
      },
    }
  );
  const data = await res.json();
  return data;
}
