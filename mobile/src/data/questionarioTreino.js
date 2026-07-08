export const questions = [
    {
    id: "peso",
    title: "Qual seu peso em kg?",
    type: "number",
    step: 0.1,
    placeholder: "Ex: 77.5",
    unit: "kg",
    allowUnknown: true
  },
  {
    id: "altura",
    title: "Qual sua altura em cm?",
    type: "number",
    step: 1,
    placeholder: "Ex: 178",
    unit: "cm",
    allowUnknown: true
  },
  {
    id: "objetivo",
    title: "Qual seu objetivo?",
    type: "options",
    options: [
      "Força",
      "Aumentar a resistência física",
      "Desenvolvimento Muscular",
      "Aprender movimentos avançados",
      "Sair do sedentarismo"
    ]
  },
  {
    id: "flexaoInclinada",
    title: "Qual o máximo de flexões inclinadas você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/flexao_inclinada.gif"),
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "flexaoPadrao",
    title: "Qual o máximo de flexões padrão você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/flexaoPadrao.gif"),
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "barraAustraliana",
    title: "Quantas Barras australianas você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/barraAustraliana.gif"),
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "barraFixa",
    title: "Quantas Barras fixas você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/barraFixa.gif"),
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "agachamentoSofa",
    title: "Qual o máximo de agachamentos no sofá você consegue fazer?",
    type: "options",
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "agachamentoPadrao",
    title: "Quantos agachamentos você consegue fazer?",
    type: "options",
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "prancha",
    title: "Quantos segundos de prancha você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/prancha.gif"),
    options: ["Não consigo fazer", "10-20", "21-30", "31-60", "+60"]
  },
  {
    id: "abdominalSupra",
    title: "Quantos abdominais você consegue fazer?",
    type: "options",
    image: require("../assets/gifs/abdominalSupra.gif"),
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "recorrencia",
    title: "Quantos dias você consegue treinar considerando sua semana mais ocupada?",
    type: "options",
    options: ["1", "2", "3", "4", "5", "6"]
  },
  {
    id: "tempo",
    title: "Quanto tempo você tem disponível?",
    type: "options",
    options: ["Menos de 30 min", "30-45 min", "35-60 min", "+60 min"]
  },
  {
    id: "lesoes",
    title:
      "Você tem alguma limitação ou lesão que te impeça de realizar algum exercício? Se sim, poderia informar mais sobre?",
    type: "textarea",
    placeholder: "Digite aqui suas limitações ou lesões",
    quickFill: {
      label: "Não tenho lesões",
      value: "Não tenho lesões"
    }
  },
  {
    id: "equipamentos",
    title: "Poderia selecionar os equipamentos que tem acesso?",
    type: "multiselect",
    options: [
      "Barra fixa/barra de porta",
      "Barra paralela",
      "Paralete baixo/médio",
      "Argolas Olímpicas",
      "Equipamentos da praça da prefeituras",
      "Chão/parede/banco etc"
    ],
    minSelected: 1
  }
]