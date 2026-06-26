// Componente filho de Form.tsx, responsável por exibir o conteúdo de cada passo do formulário, incluindo um ícone, título e pergunta ou instrução relacionada ao passo atual. Ele recebe as seguintes props:
// - `icon`: um componente de ícone do Lucide que representa visualmente o passo atual.
// - `title`: uma string que serve como título do passo, geralmente em letras maiúsculas e com um estilo específico.
// - `question`: uma string que contém a pergunta ou instrução relacionada ao passo atual, exibida em um estilo de texto maior e mais destacado.
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Input, type InputProps } from "../../shared/Input";
import { Button } from "../../shared/Button";
import { useState, type SyntheticEvent } from "react";
// máscara monetária
import { formatCurrencyMask } from "../../../utils/currency";

export interface FormStepProps {
  // Adicionei a propriedade id para identificar cada passo do formulário de forma única. Isso pode ser útil para navegação, rastreamento ou manipulação de estado.
  id: string;
  icon: LucideIcon;
  title: string;
  question: string;
  // Adicionei a propriedade inputProps para passar as props do Input
  inputProps: InputProps;
  // Opcionalmente, você pode passar props para o botão de submit, como o label e um ícone emoji. Caso não seja fornecido, o botão terá um comportamento padrão.
  submitButtonProps?: {
    label: string;
    emojiIcon?: string;
  };
}

interface ActionsButtonsProps {
  onBack: () => void;
  onNext: (value: string) => void;
  hideBackButton?: boolean;
}

export function FormStep({
  // recebe de Form.tsx o ícone do passo atual, que é um componente do Lucide
  icon: Icon,
  // recebe de Form.tsx o título do passo atual, que é uma string
  title,
  // recebe de Form.tsx a pergunta ou instrução relacionada ao passo atual, que é uma string
  question,
  // recebe de Form.tsx as props do Input, que são passadas para o componente Input dentro do FormStep
  inputProps,
  // recebe de Form.tsx as props do botão de submit, que são passadas para o botão dentro do FormStep (opcional). Não é obrigatório, pois o botão de submit pode ter um comportamento padrão caso não seja fornecido.
  submitButtonProps,
  onBack,
  onNext,
  hideBackButton,
}: FormStepProps & ActionsButtonsProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    // previne o comportamento padrão da página
    e.preventDefault();

    // validação: caso nada esteja escrito, não retornar nada
    if (!inputValue) {
      return;
    }

    onNext(inputValue);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
      <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
        {question}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input component */}
        <Input
          {...inputProps}
          value={inputValue}
          onChange={(e) =>
            setInputValue(
              // só será formatado o valor do input quando for o caso de dinheiro (quando o 'R$' estiver sendo utilizado)
              inputProps.prefix === "R$"
                ? formatCurrencyMask(e.target.value)
                : e.target.value,
            )
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {/* Condicional: se o "hideBackButton" for falso, o botão de voltar será renderizado */}
          {!hideBackButton && (
            // Botão de voltar
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              icon={ArrowLeft}
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
            >
              Voltar
            </Button>
          )}

          {/* Botão de submit (avançar) */}
          <Button
            type="submit"
            variant="primary"
            // Se não houver props de submitButtonProps, o ícone do botão será o ArrowRight. Caso contrário, não haverá ícone, indicando o final do formulário ou um comportamento diferente. Isso permite que o botão de submit tenha um comportamento padrão caso não seja fornecido um label ou ícone específico.
            icon={!submitButtonProps ? ArrowRight : undefined}
            disabled={!inputValue}
            className="order-1 flex-1 sm:order-2"
          >
            {/* Se a expressão da esquerda for verdadeira, exibe o label do botão de submit. Caso contrário, exibe o texto "Próximo". */}
            {submitButtonProps?.label ?? "Próximo"}
            {/* Se houver props de submitButtonProps e um ícone emoji for fornecido, exibe o ícone. */}
            {submitButtonProps?.emojiIcon}
          </Button>
        </div>
      </form>
    </div>
  );
}
