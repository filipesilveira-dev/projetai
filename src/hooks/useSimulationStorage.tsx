// O custom hook aqui funciona como uma caixa de ferramentas que fornece a ferramenta "saveFormData"
import type { SimulationFormData, SimulationRecord } from "../data/simulation";

// nome da chave criada no locaStorage: armazenar em uma variável previne erros de digitação
const LOCAL_STORAGE_KEY = "simulation-data";

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    // constante recebe um valor aleatório criado com o método randomUUID()
    const id = crypto.randomUUID();
    const record: SimulationRecord = { ...formData, id };
    // Tenta buscar no localStorage do navegador se já existe uma chave "simulation-data". O resultado é retornado como uma string ou null
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Se "storage" for verdadeiro (ou seja, existir), então converte a string de volta para um array de objetos em JavaScript usando JSON.parse() e avisa ao TypeScript que aquilo é um array de SimulationFormData[]
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : // Se não existir (storage é nulo): Inicializa a variável savedData como um array vazio []
        [];

    // Salva os dados atualizados de volta no localStorage utilizando o "setItem"
    localStorage.setItem(
      // Passa a chave a ser criada "simulation-data"
      LOCAL_STORAGE_KEY,
      // Utiliza o "...saveData" para copiar todos os dados antigos e adicona o novo "formData" no array final. Como o localStorage só aceita texto, o JSON.stringify() transforma esse novo array atualizado em uma string JSON. Após adição do ID, 'record' é igual a "formData + ID"
      JSON.stringify([...savedData, record]),
    );

    // o custom hook retorna o id criado em saveFormData
    return id
  };

  // Função que recupera um array tipado como SimulationRecord do localStorage com base no seu id
  const getFormData = (id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storage) {
      return null;
    }

    // o "JSON.parse()" transforma a string salva no localStorage em objeto ou array novamente
    const savedData = JSON.parse(storage) as SimulationRecord[];
    return savedData.find((record) => record.id === id) || null;
  };

  // O hook retorna um objeto contendo a função saveFormData e getFormData. Assim, qualquer componente que instanciar esse hook terá acesso a essa função para salvar dados.
  return { saveFormData, getFormData };
};
