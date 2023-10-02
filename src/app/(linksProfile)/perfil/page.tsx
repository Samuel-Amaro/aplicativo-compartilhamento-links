import dynamic from "next/dynamic";
import styles from "./styles.module.css";
import { Metadata } from "next";

const Profile = dynamic(() => import("../../../components/Profile"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Perfil Usuário",
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
    title: "Perfil Usuário",
    description:
      "Personalize seus links e compartilhe todos os seus perfis com o mundo!",
    siteName: "Aplicativo de compartilhamento de links",
    type: "website",
    images: "/icon.svg",
  },
};

export default function Page() {
  return (
    <section>
      <header className={styles.header}>
        <h1 className={`headingM ${styles.title}`}>Detalhes de perfil</h1>
        <p className={`bodyM ${styles.description}`}>Adicione seus dados para criar um toque pessoal ao seu perfil.</p>
      </header>
      <Profile />
    </section>
  );
}
