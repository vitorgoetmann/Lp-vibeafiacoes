export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

export const catalog: CatalogItem[] = [
  {
    id: "alicate-cuticula",
    name: "Alicate de Cutícula",
    price: 15,
    icon: "✂️",
    description: "Afiação precisa para corte perfeito",
  },
  {
    id: "alicate-unha",
    name: "Alicate de Unha",
    price: 15,
    icon: "✂️",
    description: "Reafio e ajuste para melhor performance",
  },
  {
    id: "cutelo",
    name: "Cutelo",
    price: 15,
    icon: "🔪",
    description: "Afiação profissional para cutelos",
  },
  {
    id: "espatula",
    name: "Espátula",
    price: 5,
    icon: "🔧",
    description: "Afiação e acabamento de espátulas",
  },
  {
    id: "faca-simples",
    name: "Faca Simples",
    price: 15,
    icon: "🔪",
    description: "Para facas domésticas e profissionais",
  },
  {
    id: "laminas-diversas",
    name: "Lâminas Diversas",
    price: 15,
    icon: "⚡",
    description: "Afiação de diferentes tipos de lâminas",
  },
  {
    id: "tesoura-laser",
    name: "Tesoura Fio a Laser",
    price: 30,
    icon: "✂️",
    description: "Técnica especial para fio a laser",
  },
  {
    id: "tesoura-navalha",
    name: "Tesoura Fio Navalha",
    price: 30,
    icon: "✂️",
    description: "Afiação especializada fio navalha",
  },
  {
    id: "tesoura-simples",
    name: "Tesoura Simples",
    price: 15,
    icon: "✂️",
    description: "Tesouras domésticas e profissionais",
  },
];
