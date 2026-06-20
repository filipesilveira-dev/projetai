import { type PropsWithChildren, useState } from "react";
import { useEffect } from "react";
// importa a tipagem criada lá em “ThemeContext”
import { ThemeContext, type Theme } from "./ThemeContext";

// recebe “children” como props a qual é tipada com a tipagem especial “PropsWithChildren”
export function ThemeProvider({ children }: PropsWithChildren) {
  // estado que controlará o tema. Dentro dos parênteses do useState ficará a lógica de  inicializar o estado ‘theme’ de acordo com a preferência do usuário:  seja pegando a informação do localStorage, seja pegando do sistema operacional, caso não haja nada no localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    // variável recebe o que está contido na chave “theme” presente no localStorage. Tipado de acordo com “Theme” ou pode ser “null”
    const localStorageTheme = localStorage.getItem("theme") as Theme | null;

    // se houver algo no localStorage, retorne a variável
    if (localStorageTheme) {
      return localStorageTheme;
    }

    // trecho de código que pega a configuração do sistema caso não haja nada no localStorage
    const systemPrefersDark = window.matchMedia(
      // pergunta se o sistema operacional é dark ou não. A variável recebe um valor booleano (‘true’ ou ‘false’)
      "(prefers-color-scheme: dark)",
    ).matches;

    // se for verdadeiro, retorna ‘dark’, se for falso, retorna ‘light’
    return systemPrefersDark ? "dark" : "light";
  });

  // lógica que faz com que o atributo que será adicionado na tag <html> para poder alterá-lo de acordo com o tema atual
  useEffect(() => {
    // seleciona o elemento <html> da página e atribui um atributo chamado ‘data-theme’ com o valor de ‘theme’. Perceba que está sendo utilizado o mesmo nome usado nas variáveis definidas no arquivo theme.css
    document.documentElement.setAttribute("data-theme", theme);
    // pega o valor e setta no localStorage na chave ‘theme’ o valor ‘theme’
    localStorage.setItem("theme", theme);
    // “theme” como dependência do useEffect. Ou seja, sempre que a dependência mudar, a lógica contida aqui será executada novamente.
  }, [theme]);

  // função que alterna entre os temas
  const toggleTheme = () => {
    // altera o estado de theme: pega o estado atual e verifica qual é
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    // graças ao “.Provider” é possível passar os valores de “theme” e “toggleTheme”
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* renderiza todo o conteúdo encapsulado nesse componente */}
      {children}
    </ThemeContext.Provider>
  );
}
