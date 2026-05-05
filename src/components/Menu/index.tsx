import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storedTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storedTheme;
  });

  const nextThemeIcon = {
    light: <MoonIcon />,
    dark: <SunIcon />,
  };

  const toggleTheme = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault(); // Não seguir o link

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  };

  /*
   useEffect recebe 2 argumentos:
   1) Uma função com o efeito colateral que deve ser executado.
   2) Um array de dependências que define quando essa função deve rodar.

   Neste componente, a função do efeito atualiza o atributo `data-theme`
   no elemento raiz (`<html>`), para o CSS aplicar o tema correto.

   Como a dependência é [theme], o efeito executa:
   - na montagem inicial do componente;
   - sempre que `theme` mudar.

   Regra geral:
   - sem dependências: executa após toda renderização;
   - com []: executa apenas uma vez, na montagem;
   - com [valor]: executa na montagem e quando esse valor mudar.
  */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para a Home'
        title='Ir para a Home'
      >
        <HouseIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para o Histórico'
        title='Ir para o Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para as Configurações'
        title='Ir para as Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Mudar Tema'
        title='Mudar Tema'
        onClick={toggleTheme}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
