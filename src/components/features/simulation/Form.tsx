import { StepProgress } from "./Progress.tsx";
import { FormStep } from "./FormStep.tsx";
import { simulationFormSteps } from "../../../data/simulation.ts";
import { useState } from "react";

export function SimulationForm() {
  // Estado iniciado com o valor “0”, equivalente ao objeto zero da lista
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // Total de passos será igual ao comprimento da lista
  const totalSteps = simulationFormSteps.length;
  // A variável do estado atual receberá o que estiver no estado, ou seja, pode mudar de maneira dinâmica
  const currentStep = simulationFormSteps[currentStepIndex];

  // função de AVANÇAR acrescentando “+1” via setter ao estado “currentStepIndex”
  const handleNextStep = () => {
    // pequena validação: se o [indice atual + 1 for igaul ao tamanho da lista 1, significa que o usuário está no passo final, logo nada será retornado
    if (currentStepIndex + 1 > totalSteps - 1) {
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
        hideBackButton = {currentStepIndex === 0}
      />
    </>
  );
}
