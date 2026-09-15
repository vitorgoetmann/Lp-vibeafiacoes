export interface CatalogItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const catalog: CatalogItem[] = [
  {
    id: "alicate-cuticula",
    name: "Alicate de Cutícula",
    icon: "✂️",
    description: "Afiação precisa para corte perfeito",
  },
  {
    id: "alicate-unha",
    name: "Alicate de Unha",
    icon: "✂️",
    description: "Reafio e ajuste para melhor performance",
  },
  {
    id: "cutelo",
    name: "Cutelo",
    icon: "🔪",
    description: "Afiação profissional para cutelos",
  },
  {
    id: "espatula",
    name: "Espátula",
    icon: "🔧",
    description: "Afiação e acabamento de espátulas",
  },
  {
    id: "faca-simples",
    name: "Faca Simples",
    icon: "🔪",
    description: "Para facas domésticas e profissionais",
  },
  {
    id: "laminas-diversas",
    name: "Lâminas Diversas",
    icon: "⚡",
    description: "Afiação de diferentes tipos de lâminas",
  },
  {
    id: "tesoura-laser",
    name: "Tesoura Fio a Laser",
    icon: "✂️",
    description: "Técnica especial para fio a laser",
  },
  {
    id: "tesoura-navalha",
    name: "Tesoura Fio Navalha",
    icon: "✂️",
    description: "Afiação especializada fio navalha",
  },
  {
    id: "tesoura-simples",
    name: "Tesoura Simples",
    icon: "✂️",
    description: "Tesouras domésticas e profissionais",
  },
];
