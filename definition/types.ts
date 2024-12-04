import { Session } from "next-auth";

export type appSession = Session & {
  user: { name: string; mail: string; image: string };
  providerAccountId: string;
};
