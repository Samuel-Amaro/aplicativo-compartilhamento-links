import LinksContextProvider from "@/context/LinksContext";
import "../styles/normalize.css";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import ProfileContextProvider from "@/context/ProfileContext";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

export const metadata: Metadata = {
  title: "Aplicativo de compartilhamento de links",
  description:
    "Personalize seus links e compartilhe todos os seus perfis com o mundo!",
  authors: {
    name: "Samuel Amaro",
    url: "https://www.linkedin.com/in/samuel-amaro/",
  },
  keywords: [
    "Links",
    "Compartilhamento Links",
    "Personalização Links",
    "Urls",
    "Social Media Links",
    "Links Sociais",
    "Urls Sociais",
    "Perfil Social",
    "Compartilhamento Links Sociais",
    "Perfil Urls Sociais",
  ],
  openGraph: {
    title: "Aplicativo de compartilhamento de links",
    description:
      "Personalize seus links e compartilhe todos os seus perfis com o mundo!",
    siteName: "Aplicativo de compartilhamento de links",
    type: "website",
    images: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={instrumentSans.className}>
        <LinksContextProvider>
          <ProfileContextProvider>{children}</ProfileContextProvider>
        </LinksContextProvider>
      </body>
    </html>
  );
}
