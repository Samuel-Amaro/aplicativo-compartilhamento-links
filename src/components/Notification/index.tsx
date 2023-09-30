"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

export default function Notification({
  message,
  icon,
  showNotification,
  setShowNotification,
}: {
  message: string;
  icon: React.ReactNode;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}) {
  const timerId = useRef<number | NodeJS.Timeout>(0);

  useEffect(() => {
    timerId.current = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => {
      clearTimeout(timerId.current);
      setShowNotification(false);
    };
  }, []);

  if (showNotification) {
    return createPortal(
      <div role="alert" className={styles.notification}>
        {icon}
        <span className={`headingS ${styles.text}`}>{message}</span>
      </div>,
      document.body,
    );
  }

  return null;
}
