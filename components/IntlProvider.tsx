import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export default function IntlProvider({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}): React.ReactNode {
  return (
    <NextIntlClientProvider
      locale="fr"
      timeZone="Europe/Paris"
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
