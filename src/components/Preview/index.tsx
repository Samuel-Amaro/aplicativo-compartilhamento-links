"use client";

import { useLinksContext } from "@/context/LinksContext";
import { useProfileContext } from "@/context/ProfileContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { getIconPlatform } from "@/utils/utils";
import ArrowRight from "../Icons/ArrowRight";
import { useEffect, useState } from "react";
import Notification from "../Notification";
import LinkIcon from "../Icons/Link";

export default function Preview() {
  const customizeLinksContext = useLinksContext();
  const profileContext = useProfileContext();
  const [btnShareIsActive, setBtnShareIsActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(true);

  useEffect(() => {
    if (btnShareIsActive) {
      setShowNotification(true);
      navigator.clipboard.writeText(window.location.href);
    }
  }, [btnShareIsActive]);

  useEffect(() => {
    if (showNotification) {
      setBtnShareIsActive(false);
    }
  }, [showNotification]);

  useEffect(() => {
    if (
      profileContext.profileDetails.firstName ||
      profileContext.profileDetails.lastName ||
      profileContext.profileDetails.email ||
      profileContext.profileDetails.dataUrlPicture ||
      customizeLinksContext.customizeLinks.length > 0
    ) {
      setShowProfile(true);
      return;
    }
    setShowProfile(false);
  }, [profileContext.profileDetails, customizeLinksContext.customizeLinks]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link
              href="/"
              target="_self"
              rel="previous"
              title="Voltar ao Editor"
              aria-label="Voltar ao Editor"
              className={`buttonSecondary ${styles.linkBack}`}
            >
              Voltar ao Editor
            </Link>
            <button
              type="button"
              title="Compartilhar link"
              aria-label="Compartilhar link"
              className={`buttonPrimary ${styles.buttonShare}`}
              onClick={() => setBtnShareIsActive(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "") {
                  setBtnShareIsActive(true);
                }
              }}
            >
              Compartilhar link
            </button>
          </nav>
        </header>
        <main className={styles.main}>
          {showProfile ? (
            <div className={styles.cardProfile}>
              {profileContext.profileDetails.dataUrlPicture ? (
                <Image
                  src={profileContext.profileDetails.dataUrlPicture}
                  alt="Foto Perfil"
                  width={104}
                  height={104}
                  className={styles.profileImage}
                />
              ) : (
                profileContext.profileDetails.firstName &&
                profileContext.profileDetails.lastName && (
                  <span
                    className={styles.profileText}
                  >{`${profileContext.profileDetails.firstName
                    .trim()
                    .trim()
                    .charAt(0)}${profileContext.profileDetails.lastName
                    .trim()
                    .trim()
                    .charAt(0)}`}</span>
                )
              )}
              {profileContext.profileDetails.firstName &&
                profileContext.profileDetails.lastName && (
                  <h1
                    className={`headingM ${styles.name}`}
                  >{`${profileContext.profileDetails.firstName.trim()} ${profileContext.profileDetails.lastName.trim()}`}</h1>
                )}
              {profileContext.profileDetails.email && (
                <Link
                  href={`mailto:${profileContext.profileDetails.email}`}
                  target="_blank"
                  rel="external"
                  title="Email"
                  aria-label="Email"
                  className={`bodyM ${styles.linkEmail}`}
                >
                  {profileContext.profileDetails.email}
                </Link>
              )}
              {customizeLinksContext.customizeLinks.length > 0 && (
                <ul className={styles.list}>
                  {customizeLinksContext.customizeLinks.map((customLink) => (
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
                        <p className={`bodyM ${styles.linkPlatformContent}`}>
                          {getIconPlatform(
                            customLink.plataform,
                            styles.iconPlatform,
                          )}{" "}
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
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <span className={styles.message}>
              Sem Dados de Profile para visualização
            </span>
          )}
        </main>
      </div>
      {showNotification && (
        <Notification
          showNotification={showNotification}
          setShowNotification={(show: boolean) => setShowNotification(show)}
          message="O link foi copiado para sua área de transferência!"
          icon={<LinkIcon />}
        />
      )}
    </>
  );
}
