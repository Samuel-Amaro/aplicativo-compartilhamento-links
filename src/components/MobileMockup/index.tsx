"use client";

import Image from "next/image";
import useMatchMedia from "@/hooks/useMatchMedia";
import styles from "./styles.module.css";

export default function MobileMockup({ className }: { className?: string }) {
  return useMatchMedia({
    mobileContent: null,
    desktopContent: (
      <div
        className={
          className ? `${className} ${styles.container}` : styles.container
        }
      >
        <Image
          src="./images/illustration-phone-mockup.svg"
          alt=""
          aria-hidden="true"
          width={308}
          height={632}
        />
      </div>
    ),
    mediaQuery: "(min-width: 950px)",
  });
}
