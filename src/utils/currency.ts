// Função para fromatar o valor do input em real (R$)
export function formatCurrencyMask(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const number = Number(digits) / 100;

  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Função utilitária
export function parseCurrency(value: string): number {
  return (
    // Pega o valor passado, remove os pontos, troca as vírgulas por pontes, remove o "R$" e transforma em número com o parseFloat
    parseFloat(value.replace(/\./g, ``).replace(",", ".").replace("R$", "")) ||
    0
  );
}
