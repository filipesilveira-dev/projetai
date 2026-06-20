import {createContext} from 'react'

// tipagem criada para tipar “theme”
export type Theme = 'light' | 'dark'

interface ThemeContextValue {
	// tipado de acordo com Theme (tipagem criada mais acima)
	theme: Theme
	toggleTheme: ()=>void
}

// cria o contexto e tipa qual o valor esse contexto está provendo. No caso aqui, está provendo de acordo com a interface ou “undefined”. Aqui está com valor inicial de “undefined” por questões segurança
export const ThemeContext = createContext<ThemeContextValue | undefined>(
	undefined,
)
