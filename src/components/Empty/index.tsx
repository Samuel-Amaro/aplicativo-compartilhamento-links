import Image from "next/image";
import styles from "./styles.module.css";

export default function Empty() {
  return (
    <div className={styles.container}>
      <Image
        src="./images/illustration-empty.svg"
        alt="Ilustração demostrando contéudo vazio"
        width={250}
        height={161}
        className={styles.ilustration}
      />
      <h2 className={`headingM ${styles.title}`}>Vamos começar</h2>
      <p className={`bodyM ${styles.description}`}>
        Use o botão “Adicionar novo link” para começar. Depois de ter mais de um
        link, você pode reordená-los e editá-los. Estamos aqui para ajudá-lo a
        compartilhar seus perfis com todos!
      </p>
    </div>
  );
}
