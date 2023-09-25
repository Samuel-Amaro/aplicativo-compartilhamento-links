import styles from "./page.module.css";
import Header from "@/components/Header";
import MobileMockup from "@/components/MobileMockup";
import dynamic from "next/dynamic";

//TODO: INICIAR ESTILIZAÇÃO MOBILE-FIRST PAGE HOME E SEUS COMPONENTES
//TODO: TERMINAR O COMPONENTE MOBILE-MOCKUP ADD OS CUSTOM LINKS PRONTOS, FOTO PROFILE OU INICIAIS, NOME, VER
//TODO: OQUE FALTA PARA TERMINAR A PAGE HOME E ESTILIZAR
//TODO: AO TERMINAR PAGE HOME IR PARA A PAGE PROFILE, DEPOIS IR PARA A PAGE VIEW
//TODO: CONSTRUIR A PARTE INTERATIVA MAIS GROSSA DEPOIS ADD ESTILIZAÇÃO

const CustomizeLinks = dynamic(
  () => import("../../components/CustomizeLinks/index"),
  { ssr: false },
);

export default function Home() {
  return (
    <CustomizeLinks />
    /*<div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <MobileMockup />
        <CustomizeLinks />
      </main>
    </div>*/
  );
}
