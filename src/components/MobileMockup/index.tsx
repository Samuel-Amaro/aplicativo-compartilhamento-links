"use client";

import useMatchMedia from "@/hooks/useMatchMedia";
import styles from "./styles.module.css";
import PhoneMockup from "../Icons/PhoneMockup";
import { useLinksContext } from "@/context/LinksContext";
import Link from "next/link";
import ArrowRight from "../Icons/ArrowRight";
import { useProfileContext } from "@/context/ProfileContext";
import Image from "next/image";
import { getIconPlatform } from "@/utils/utils";

export default function MobileMockup({ className }: { className?: string }) {
  const contextLinks = useLinksContext();
  const profileContext = useProfileContext();

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
            {profileContext.profileDetails.dataUrlPicture ? (
              <Image
                src={profileContext.profileDetails.dataUrlPicture}
                alt="Foto Perfil"
                width={96}
                height={96}
                className={styles.profileImage}
              />
            ) : (
              profileContext.profileDetails.firstName &&
              profileContext.profileDetails.lastName && (
                <span
                  className={styles.profile}
                >{`${profileContext.profileDetails.firstName
                  .trim()
                  .charAt(0)}${profileContext.profileDetails.lastName
                  .trim()
                  .charAt(0)}`}</span>
              )
            )}
            {profileContext.profileDetails.firstName &&
              profileContext.profileDetails.lastName && (
                <p className={styles.name}>
                  {`${profileContext.profileDetails.firstName.trim()} ${profileContext.profileDetails.lastName.trim()}`}
                </p>
              )}
            {profileContext.profileDetails.email && (
              <p className={styles.email}>
                {profileContext.profileDetails.email}
              </p>
            )}
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
