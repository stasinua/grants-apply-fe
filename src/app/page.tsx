import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Grants application dashboard
          </li>
          <li>Grants made easy</li>
        </ol>
      </main>
    </div>
  );
}
