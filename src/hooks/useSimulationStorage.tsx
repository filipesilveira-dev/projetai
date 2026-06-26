// O custom hook aqui funciona como uma caixa de ferramentas que fornece a ferramenta "saveFormData"
import type { SimulationFormData } from "../data/simulation";

// nome da chave criada no locaStorage: armazenar em uma variável previne erros de digitação
const LOCAL_STORAGE_KEY = "simulation-data";

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    // Tenta buscar no localStorage do navegador se já existe uma chave "simulation-data". O resultado é retornado como uma string ou null
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Se "storage" for verdadeiro (ou seja, existir), então converte a string de volta para um array de objetos em JavaScript usando JSON.parse() e avisa ao TypeScript que aquilo é um array de SimulationFormData[]
    const savedData = storage
      ? (JSON.parse(storage) as SimulationFormData[])
      // Se não existir (storage é nulo): Inicializa a variável savedData como um array vazio []
      : [];

    // Salva os dados atualizados de volta no localStorage utilizando o "setItem"
    localStorage.setItem(
        // Passa a chave a ser criada "simulation-data"
      LOCAL_STORAGE_KEY,
      // Utiliza o "...saveData" para copiar todos os dados antigos e adicona o novo "formData" no array final. Como o localStorage só aceita texto, o JSON.stringify() transforma esse novo array atualizado em uma string JSON.
      JSON.stringify([...savedData, formData]),
    );
  };

  // O hook retorna um objeto contendo a função saveFormData. Assim, qualquer componente que instanciar esse hook terá acesso a essa função para salvar dados.
  return  {saveFormData} ;
};
