"use client";

import Link from "next/link";
import LogoSmall from "../Icons/LogoSmall";
import LinkIcon from "../Icons/Link";
import ProfileDetails from "../Icons/ProfileDetails";
import Preview from "../Icons/Preview";
import DevLinks from "../Icons/DevLinks";
import useMatchMedia from "@/hooks/useMatchMedia";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const pathname = usePathname();
  const mobile = (
    <nav className={styles.headerNav}>
      <Link
        href="/"
        rel="next"
        target="_self"
        title="Home"
        aria-label="Home"
        className={`${styles.headerLink} ${styles.headerLogo}`}
      >
        <LogoSmall className={styles.headerIcon} />
      </Link>
      <div className={styles.headerContainerNav}>
        <Link
          href="/"
          target="_self"
          rel="next"
          title="Ir para página Home"
          aria-label="Ir para página Home"
          className={
            "/" === pathname
              ? `${styles.headerLink} ${styles.headerLinkNav} ${styles.headerLinkNavActive}`
              : `${styles.headerLink} ${styles.headerLinkNav}`
          }
        >
          <LinkIcon className={styles.headerIcon} />
        </Link>
        <Link
          href="/perfil"
          target="_self"
          rel="next"
          title="Ir para página detalhes perfil"
          aria-label="Ir para página detalhes perfil"
          className={
            "/perfil" === pathname
              ? `${styles.headerLink} ${styles.headerLinkNav} ${styles.headerLinkNavActive}`
              : `${styles.headerLink} ${styles.headerLinkNav}`
          }
        >
          <ProfileDetails className={styles.headerIcon} />
        </Link>
      </div>
      <Link
        href="/visualizar"
        target="_self"
        rel="next"
        title="Ir para página visualização"
        aria-label="Ir para página visualização"
        className={
          "/visualizar" === pathname
            ? `${styles.headerLink} ${styles.headerLinkNavPreview} ${styles.headerLinkNavActive}`
            : `${styles.headerLink} ${styles.headerLinkNavPreview}`
        }
      >
        <Preview />
      </Link>
    </nav>
  );

  const desktop = (
    <nav className={styles.headerNav}>
      <Link
        href="/"
        rel="next"
        target="_self"
        title="Home"
        aria-label="Home"
        className={styles.headerLogo}
      >
        <LogoSmall className={styles.headerIconLogo} />
        <DevLinks />
      </Link>
      <div className={styles.headerContainerNav}>
        <Link
          href="/"
          target="_self"
          rel="next"
          title="Ir para página Links"
          aria-label="Ir para página Links"
          className={
            "/" === pathname
              ? `${styles.headerLink} ${styles.headerLinkNav} ${styles.headerLinkNavActive}`
              : `${styles.headerLink} ${styles.headerLinkNav}`
          }
        >
          <LinkIcon className={styles.headerIcon} />
          <span>Links</span>
        </Link>
        <Link
          href="/perfil"
          target="_self"
          rel="next"
          title="Ir para página detalhes perfil"
          aria-label="Ir para página detalhes perfil"
          className={
            "/perfil" === pathname
              ? `${styles.headerLink} ${styles.headerLinkNav} ${styles.headerLinkNavActive}`
              : `${styles.headerLink} ${styles.headerLinkNav}`
          }
        >
          <ProfileDetails className={styles.headerIcon} />
          <span>Detalhes de perfil</span>
        </Link>
      </div>
      <Link
        href="/visualizar"
        target="_self"
        rel="next"
        title="Ir para página visualização"
        aria-label="Ir para página visualização"
        className={
          "/visualizar" === pathname
            ? `${styles.headerLink} ${styles.headerLinkNavPreview} ${styles.headerLinkNavActive}`
            : `${styles.headerLink} ${styles.headerLinkNavPreview}`
        }
      >
        Visualização
      </Link>
    </nav>
  );

  return (
    <header className={styles.header}>
      {useMatchMedia({
        mobileContent: mobile,
        desktopContent: desktop,
        mediaQuery: "(min-width: 700px)",
      })}
    </header>
  );
}
