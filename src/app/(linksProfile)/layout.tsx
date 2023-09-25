import Header from "@/components/Header";
import styles from "./page.module.css";
import MobileMockup from "@/components/MobileMockup";

export default function LinksProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <MobileMockup />
        {children}
      </main>
    </div>
  );
}
