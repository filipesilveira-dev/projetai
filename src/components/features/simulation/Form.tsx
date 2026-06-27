import { StepProgress } from "./Progress.tsx";
import { FormStep } from "./FormStep.tsx";
import {
  simulationFormSteps,
  type SimulationFormData,
} from "../../../data/simulation.ts";
import { useState } from "react";
import { useSimulationStorage } from "../../../hooks/useSimulationStorage.tsx";
import { useNavigate } from "react-router-dom";

export function SimulationForm() {
  const { saveFormData } = useSimulationStorage();
  // hook utilizado para navegar entre páginas (utilizado após o clique no botão de "Gerar simulação")
  const navigate = useNavigate();
  // Estado iniciado com o valor “0”, equivalente ao objeto zero da lista
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Estado que receberá o objeto com as respostas do usuário e será salvo no LocalStorage
  const [formData, setFormData] = useState<SimulationFormData>(
    {} as SimulationFormData,
  );
  // Total de passos será igual ao comprimento da lista
  const totalSteps = simulationFormSteps.length;
  // A variável do estado atual receberá o que estiver no estado, ou seja, pode mudar de maneira dinâmica
  const currentStep = simulationFormSteps[currentStepIndex];

  // função de AVANÇAR acrescentando “+1” via setter ao estado “currentStepIndex”
  const handleNextStep = (value: string) => {
    // Debug
    // console.log("ID do Passo Atual:", currentStep.id);
    // console.log("Valor recebido no handleNextStep:", value, typeof value);

    // Constante que reebe o que já tem dentro do objeto "formData" (as propriedades desse objeto são as respostas do usuário) adicionado da resposta do atual formulário
    const updatedFormData = { ...formData, [currentStep.id]: value };
    // Atualiza o estado "FormData" com a proprieadade que acaba de ser adicionada pelo usuário
    setFormData(updatedFormData);

    // pequena validação: se o [indice atual + 1 for igaul ao tamanho da lista 1, significa que o usuário está no passo final, logo nada será retornado
    if (currentStepIndex + 1 > totalSteps - 1) {
      // Chamada da função desestruturada do custom hook useSimulationStorage que retorna o id utilizado
      const id = saveFormData(updatedFormData);
      // após salvar o objeto com suas propriedades (respostas do usuário), o usuário é levado até a página de resultados da simulação em específico com base em um id aleatório criado
      void navigate(`/resultado/${id}`);
      return;
    }

    // caso contrário, será adicionado “+1” ao estado “currentStepIndex” por meio do seu setter
    setCurrentStepIndex((prev) => prev + 1);
  };

  // função de VOLTAR diminuindo “-1” via setter ao estado “currentStepIndex”
  const handlePreviousStep = () => {
    // caso o índice seja “0”, significa que está no primeiro elemento da lista, não havendo nada antes dele. Sendo assim, nada será retornado.
    if (currentStepIndex === 0) {
      return;
    }
    // caso contrário, será diminuído “-1” ao estado “currentStepIndex” por meio do seu setter
    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      {/* Valores passados via props indicando o passo atual e o número total de passos */}
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        // a propriedade só será verddadeira, caso esteja no primeiro passo
        hideBackButton={currentStepIndex === 0}
      />
    </>
  );
}
