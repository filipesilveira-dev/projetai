import { Clock, TrendingUp, Wallet,Moon, Sun } from "lucide-react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { Divider } from "./Divider";
import { useTheme } from "../../hooks/useTheme";

export function Header() {
    // Permite a navegação programática entre as rotas da aplicação. O hook useNavigate retorna uma função que pode ser chamada para navegar para uma rota específica. No caso, é utilizado para navegar para a rota "/" ao clicar no botão "Nova simulação" e para a rota "historico" ao clicar no botão "Histórico".
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-(--border) px-6 py-3">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            icon={TrendingUp}
            onClick={() => void navigate("/")}
          >
            <span className="hidden sm:inline">Nova simulação</span>
          </Button>
          <Button
            variant="ghost"
            icon={Clock}
            onClick={() => void navigate("historico")}
          >
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
	          aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
	          variant='ghost'
	          icon={theme === 'light' ? Moon : Sun}
	          onClick={toggleTheme}
          />

        </div>
      </nav>
    </header>
  );
}
