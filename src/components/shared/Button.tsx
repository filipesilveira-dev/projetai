import type { LucideIcon } from "lucide-react";

// Essa maneira de declarar a interface é útil para garantir que o componente Button possa receber todas as propriedades padrão de um elemento button do HTML, como onClick, disabled, etc. Você pode adicionar propriedades personalizadas à interface ButtonProps se precisar de funcionalidades adicionais específicas para o seu componente Button.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Variações que o botão pode ter
  variant: "primary" | "secondary" | "ghost";
  // Pode receber um ícone opcionalmente, caso seja do tipo "icon"
  icon?: LucideIcon;
}

// Estilização básica do botão passando a variável no className. Todos os botões terão a mesma, sendo personalizadas de acordo com variant passada
const baseClasses = 'flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-nt-allowed disabled:opacity-80';

// Definição das classes variantes: a props "variant" passada vai determinar qual estilização será utilizada.
const variantClasses = {
    primary: 'bg-primary text-primary-foreground font-semibold rounded-xl',
    secondary: 'bg-secondary-button border border-border rounded-3xl',
    ghost: 'rounded-lg text-foreground',
};

export function Button({
  // Props recebidas pelo componente
  variant,
  icon: Icon,
  children,
  className,
  ...props
  // Tipagem das props recebidas pelo componente de acordo com a interface criada
}: ButtonProps) {
  return (
    //  Em className então é utilizado um array com as duas variáveis (baseClasses e variantClasses), especificando (selecionando) qual variante será utilizada. Por fim, é feito um join(' '), unindo o conteúdo das duas variáveis com um espeço em branco. Obs: a adição de className permite alguma estilização mais específica de contexto.
    <button {...props} className={[baseClasses, variantClasses[variant], className].join(' ')}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
