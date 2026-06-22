import { StepProgress } from "./Progress.tsx";

export function SimulationForm() {
  return (
    <>
    {/* Valores passados via props indicando o passo atual e o número total de passos */}
    <StepProgress currentStep={2} totalSteps={5} />
    </>
  )
}
