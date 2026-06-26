import type { SimulationFormData } from "../data/simulation";
import { parseCurrency } from "./currency";

// Retorna o valor que o usuário tem de dinheirto sobrando para poder atingor a meta
export function calcMonthlySavings(data: SimulationFormData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debts)
  );
}
