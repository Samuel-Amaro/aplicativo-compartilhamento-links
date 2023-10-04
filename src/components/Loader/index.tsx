import Image from "next/image";
import styles from "./styles.module.css";

export default function Loader({text} : {text: string}) {
  return (
    <div className={styles.container}>
      <Image src="/images/icon.svg" width={32} height={32} alt="Logo" className={styles.image} />
      <h3 className={`headingM ${styles.text}`}>{text}</h3>
    </div>
  );
}
