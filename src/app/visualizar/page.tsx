import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Visualizar",
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
    "Perfil Usuário",
  ],
  openGraph: {
    title: "Visualizar",
    description:
      "Personalize seus links e compartilhe todos os seus perfis com o mundo!",
    siteName: "Aplicativo de compartilhamento de links",
    type: "website",
    images: "/icon.svg",
  },
};

const Preview = dynamic(() => import("../../components/Preview"), {
  ssr: false,
});

export default function Page() {
  return <Preview />;
}
