import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="">Entenda como funciona a técina pomodoro</a>
      <a href="">
        Cronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤️
      </a>
    </footer>
  );
}
