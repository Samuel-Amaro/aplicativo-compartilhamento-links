"use client";

import Link from "next/link";
import LogoSmall from "../Icons/LogoSmall";
import LinkIcon from "../Icons/Link";
import ProfileDetails from "../Icons/ProfileDetails";
import Preview from "../Icons/Preview";
import DevLinks from "../Icons/DevLinks";
import useMatchMedia from "@/hooks/useMatchMedia";

export default function Header() {
  const mobile = (
    <nav>
      <Link href="/" rel="next" target="_self" title="Home" aria-label="Home">
        <LogoSmall />
      </Link>
      <div>
        <Link
          href="/links"
          target="_self"
          rel="next"
          title="Ir para página Links"
          aria-label="Ir para página Links"
        >
          <LinkIcon />
        </Link>
        <Link
          href="/perfil"
          target="_self"
          rel="next"
          title="Ir para página detalhes perfil"
          aria-label="Ir para página detalhes perfil"
        >
          <ProfileDetails />
        </Link>
      </div>
      <Link
        href="/visualizar"
        target="_self"
        rel="next"
        title="Ir para página visualização"
        aria-label="Ir para página visualização"
      >
        <Preview />
      </Link>
    </nav>
  );

  const desktop = (
    <nav>
      <Link href="/" rel="next" target="_self" title="Home" aria-label="Home">
        <LogoSmall />
        <DevLinks />
      </Link>
      <div>
        <Link
          href="/links"
          target="_self"
          rel="next"
          title="Ir para página Links"
          aria-label="Ir para página Links"
        >
          <LinkIcon />
          <span>Links</span>
        </Link>
        <Link
          href="/perfil"
          target="_self"
          rel="next"
          title="Ir para página detalhes perfil"
          aria-label="Ir para página detalhes perfil"
        >
          <ProfileDetails />
          <span>Detalhes de perfil</span>
        </Link>
      </div>
      <Link
        href="/visualizar"
        target="_self"
        rel="next"
        title="Ir para página visualização"
        aria-label="Ir para página visualização"
      >
        Visualização
      </Link>
    </nav>
  );

  return (
    <header>
      {useMatchMedia({
        mobileContent: mobile,
        desktopContent: desktop,
        mediaQuery: "(min-width: 700px)",
      })}
    </header>
  );
}
