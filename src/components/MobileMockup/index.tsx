"use client";

import useMatchMedia from "@/hooks/useMatchMedia";
import styles from "./styles.module.css";
import PhoneMockup from "../Icons/PhoneMockup";
import { useLinksContext } from "@/context/LinksContext";
import GitHub from "../Icons/GitHub";
import FrontEndMentor from "../Icons/FrontEndMentor";
import Twitter from "../Icons/Twitter";
import Linkedin from "../Icons/Linkedin";
import YouTube from "../Icons/YouTube";
import Facebook from "../Icons/Facebook";
import Twitch from "../Icons/Twitch";
import Devto from "../Icons/Devto";
import Codewars from "../Icons/Codewars";
import Codepen from "../Icons/Codepen";
import GitLab from "../Icons/GitLab";
import HashNode from "../Icons/HashNode";
import StackOverflow from "../Icons/StackOverflow";
import Link from "next/link";
import ArrowRight from "../Icons/ArrowRight";
import Freecodecamp from "../Icons/Freecodecamp";

//TODO: TRABALHAR NESTE COMPONENTE PARA MOSTRAR FOTO DO PERFIL, EMAIL, NOME(FALTA SOMENTE ESTE CAMPOS)
//TODO: AINDA NÃO CRIADOS PORQUE PRECISA DO CONTEXT ANTES
//*DONE: OS LINKS CUSTOMIZADOS JA FEITOS 

function getIconPlatform(platform: string) {
  switch (platform) {
    case "GitHub":
      return <GitHub className={styles.iconPlatform} />;
    case "Frontend Mentor":
      return <FrontEndMentor className={styles.iconPlatform} isColor={true} />;
    case "Twitter":
      return <Twitter className={styles.iconPlatform} />;
    case "Linkedln":
      return <Linkedin className={styles.iconPlatform} />;
    case "YouTube":
      return <YouTube className={styles.iconPlatform} />;
    case "Facebook":
      return <Facebook className={styles.iconPlatform} />;
    case "Twitch":
      return <Twitch className={styles.iconPlatform} />;
    case "Dev.to":
      return <Devto className={styles.iconPlatform} isColor={true} />;
    case "Codewars":
      return <Codewars className={styles.iconPlatform} />;
    case "Codepen":
      return <Codepen className={styles.iconPlatform} />;
    case "FreeCodeCamp":
      return <Freecodecamp className={styles.iconPlatform} />;
    case "GitLab":
      return <GitLab className={styles.iconPlatform} />;
    case "Hashnode":
      return <HashNode className={styles.iconPlatform} />;
    case "Stack Overflow":
      return <StackOverflow className={styles.iconPlatform} />;
    default:
      break;
  }
}

export default function MobileMockup({ className }: { className?: string }) {
  const contextLinks = useLinksContext();

  const desktop = (
    <div
      className={
        className ? `${className} ${styles.container}` : styles.container
      }
    >
      <div className={styles.containerIlustration}>
        <PhoneMockup className={styles.ilustration} />
        <div className={styles.containerIlustrationWrapper}>
          <div className={styles.containerIlustrationContent}>
            <span className={styles.profile}>Foto Perfil</span>
            <p className={styles.name}>nome</p>
            <p className={styles.email}>email</p>
            {contextLinks.customizeLinks.length > 0 && (
              <ul className={styles.list}>
                {contextLinks.customizeLinks.map((customLink) => {
                  return (
                    <li key={customLink.id} className={styles.listItem}>
                      <Link
                        href={customLink.link}
                        target="_blank"
                        rel="external"
                        title={`Visitar perfil ${customLink.plataform}`}
                        aria-label={`Visitar perfil ${customLink.plataform}`}
                        className={
                          customLink.plataform
                            .split(/[\s\/.]/gi)
                            .join("")
                            .toLowerCase() === "frontendmentor"
                            ? `bg${customLink.plataform
                                .split(/[\s\/.]/gi)
                                .join("")
                                .toLowerCase()} bodyS ${styles.linkPlatform} ${
                                styles.linkPlatformFrontendMentor
                              }`
                            : `bg${customLink.plataform
                                .split(/[\s\/.]/gi)
                                .join("")
                                .toLowerCase()} bodyS ${styles.linkPlatform}`
                        }
                      >
                        <p className={styles.linkPlatformContent}>
                          {getIconPlatform(customLink.plataform)}{" "}
                          {customLink.plataform}
                        </p>
                        <ArrowRight
                          className={
                            customLink.plataform
                              .split(/[\s\/.]/gi)
                              .join("")
                              .toLowerCase() === "frontendmentor"
                              ? `${styles.linkPlatformIcon} ${styles.linkPlatformIconFrontendMentor}`
                              : styles.linkPlatformIcon
                          }
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return useMatchMedia({
    mobileContent: null,
    desktopContent: desktop,
    mediaQuery: "(min-width: 950px)",
  });
}
