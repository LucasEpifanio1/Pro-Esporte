const questions = [
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
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "flexaoPadrao",
    title: "Qual o máximo de flexões padrão você consegue fazer?",
    type: "options",
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "barraAustraliana",
    title: "Quantas Barras australianas você consegue fazer?",
    type: "options",
    options: ["Não consigo fazer", "1-5", "5-10", "10-20", "+20"]
  },
  {
    id: "barraFixa",
    title: "Quantas Barras fixas você consegue fazer?",
    type: "options",
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
    options: ["Não consigo fazer", "10-20", "21-30", "31-60", "+60"]
  },
  {
    id: "abdominalSupra",
    title: "Quantos abdominais você consegue fazer?",
    type: "options",
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
      "Paralete baixo/médio",
      "Barra paralela",
      "Equipamentos da praça da prefeitura",
      "Argolas Olímpicas",
      "Chão/parede/banco etc"
    ],
    minSelected: 1
  }
];

let currentIndex = 0;

const answers = (() => {
  try {
    return JSON.parse(localStorage.getItem("questionarioTreinoAnswers")) || {};
  } catch {
    return {};
  }
})();

const questionTitle = document.getElementById("questionTitle");
const questionBody = document.getElementById("questionBody");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const backBtn = document.getElementById("backBtn");
const nextBtnLabel = document.getElementById("nextBtnLabel"); // se você criou <span id="nextBtnLabel">

function persist() {
  localStorage.setItem("questionarioTreinoAnswers", JSON.stringify(answers));
}

function renderQuestion() {
  const q = questions[currentIndex];

  questionTitle.textContent = q.title;

  progressText.textContent = `Pergunta ${currentIndex + 1} de ${questions.length}`;
  const pct = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${pct}%`;
  
  if (backBtn) backBtn.disabled = currentIndex === 0;

  const isLast = currentIndex === questions.length - 1;
  if (nextBtnLabel) {
    nextBtnLabel.textContent = isLast ? "Finalizar" : "Próxima";
  } else {
  }

  questionBody.innerHTML = "";

  if (q.type === "options") {
    renderOptionsQuestion(q);
  } else if (q.type === "textarea") {
    renderTextareaQuestion(q);
  } else if (q.type === "multiselect") {
    renderMultiSelectQuestion(q);
  } else {
    renderInputQuestion(q); // number/text/etc
  }
}

function renderInputQuestion(q) {
  let markedUnknown = answers[q.id] === null;

  const row = document.createElement("div");
  row.className = "flex gap-2";

  const input = document.createElement("input");
  input.type = q.type || "text";
  input.step = q.step ?? "1";
  input.placeholder = q.placeholder ?? "";
  input.className =
    "flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none md:text-sm " +
    "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500";

  if (typeof answers[q.id] === "number") input.value = String(answers[q.id]);
  else input.value = "";

  const unit = document.createElement("span");
  unit.className = "text-yellow-400 flex items-center px-3";
  unit.textContent = q.unit ?? "";

  row.appendChild(input);
  if (q.unit) row.appendChild(unit);

  questionBody.appendChild(row);

  if (q.allowUnknown) {
    const unknownBtn = document.createElement("button");
    unknownBtn.type = "button";
    unknownBtn.className =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all " +
      "border h-9 px-4 py-2 w-full border-gray-700 text-gray-300 hover:bg-gray-800";
    unknownBtn.textContent = "Não sei";

    unknownBtn.addEventListener("click", () => {
      markedUnknown = true;
      answers[q.id] = null;
      input.value = "";
      persist();
      updateNextButtonState();
    });

    questionBody.appendChild(unknownBtn);
  }

  function updateNextButtonState() {
    const hasValue = input.value.trim() !== "";
    nextBtn.disabled = !(markedUnknown || hasValue);
  }

  function saveAndValidate() {
    const v = input.value.trim();

    if (v !== "") markedUnknown = false;

    if (v === "") {
      if (!markedUnknown) answers[q.id] = undefined;
    } else {
      const num = Number(v);
      answers[q.id] = Number.isNaN(num) ? undefined : num;
    }

    if (v !== "" && Number.isNaN(Number(v))) {
      nextBtn.disabled = true;
      return;
    }

    persist();
    updateNextButtonState();
  }

  input.addEventListener("input", saveAndValidate);
  input.addEventListener("focus", () => {
    if (markedUnknown) {
      markedUnknown = false;
      answers[q.id] = undefined;
      persist();
      updateNextButtonState();
    }
  });

  // estado inicial
  updateNextButtonState();
  if (typeof answers[q.id] === "number") nextBtn.disabled = false;
  if (answers[q.id] === null) nextBtn.disabled = false;
}

function renderOptionsQuestion(q) {
  nextBtn.disabled = true;

  q.options.forEach((label) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "w-full text-left px-6 py-4 rounded-2xl border border-gray-700 " +
      "bg-gray-900/40 text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition";
    btn.textContent = label;

    btn.addEventListener("click", () => {
      answers[q.id] = label;
      persist();
      nextBtn.disabled = false;

      [...questionBody.querySelectorAll("button")].forEach((b) => {
        b.classList.remove("border-yellow-400", "bg-yellow-400/15");
        b.classList.add("border-gray-700", "bg-gray-900/40");
      });

      btn.classList.remove("border-gray-700", "bg-gray-900/40");
      btn.classList.add("border-yellow-400", "bg-yellow-400/15");
    });

    questionBody.appendChild(btn);
  });

  if (answers[q.id]) {
    const prev = answers[q.id];
    const btns = [...questionBody.querySelectorAll("button")];
    const found = btns.find((b) => b.textContent === prev);
    if (found) found.click();
  }
}

// ---------- Pergunta textarea + botão rápido ----------
function renderTextareaQuestion(q) {
  let usedQuickFill = answers[q.id] === (q.quickFill?.value ?? null);
  nextBtn.disabled = true;

  const textarea = document.createElement("textarea");
  textarea.rows = 4;
  textarea.placeholder = q.placeholder ?? "";
  textarea.className =
    "w-full min-h-[120px] rounded-2xl border px-4 py-3 text-base outline-none md:text-sm " +
    "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500";

  if (typeof answers[q.id] === "string" && answers[q.id] !== (q.quickFill?.value ?? "")) {
    textarea.value = answers[q.id];
    usedQuickFill = false;
  } else {
    textarea.value = "";
  }

  questionBody.appendChild(textarea);

  let quickBtn = null;
  if (q.quickFill?.label && q.quickFill?.value) {
    quickBtn = document.createElement("button");
    quickBtn.type = "button";
    quickBtn.className =
      "w-full mt-4 inline-flex items-center justify-center rounded-2xl border px-6 py-4 " +
      "border-gray-700 text-gray-300 hover:bg-gray-800 transition";
    quickBtn.textContent = q.quickFill.label;

    quickBtn.addEventListener("click", () => {
      usedQuickFill = true;
      answers[q.id] = q.quickFill.value;
      textarea.value = "";
      persist();

      nextBtn.disabled = false;

      quickBtn.classList.add("border-yellow-400", "bg-yellow-400/10");
      quickBtn.classList.remove("border-gray-700");
    });

    questionBody.appendChild(quickBtn);
  }

  function update() {
    const text = textarea.value.trim();
    const hasText = text.length > 0;

    if (hasText) {
      usedQuickFill = false;
      answers[q.id] = text;

      if (quickBtn) {
        quickBtn.classList.remove("border-yellow-400", "bg-yellow-400/10");
        quickBtn.classList.add("border-gray-700");
      }
    } else {
      if (!usedQuickFill) answers[q.id] = undefined;
    }

    persist();
    nextBtn.disabled = !(hasText || usedQuickFill);
  }

  textarea.addEventListener("input", update);
  textarea.addEventListener("focus", () => {
    if (usedQuickFill) {
      usedQuickFill = false;
      answers[q.id] = undefined;

      if (quickBtn) {
        quickBtn.classList.remove("border-yellow-400", "bg-yellow-400/10");
        quickBtn.classList.add("border-gray-700");
      }

      persist();
      update();
    }
  });

  // estado inicial
  if (usedQuickFill) {
    nextBtn.disabled = false;
    if (quickBtn) {
      quickBtn.classList.add("border-yellow-400", "bg-yellow-400/10");
      quickBtn.classList.remove("border-gray-700");
    }
  } else {
    update();
  }
}

// ---------- Pergunta multiselect (checkbox) ----------
function renderMultiSelectQuestion(q) {
  const minSelected = q.minSelected ?? 1;

  const selected = new Set(Array.isArray(answers[q.id]) ? answers[q.id] : []);
  nextBtn.disabled = selected.size < minSelected;

  q.options.forEach((label) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className =
      "w-full flex items-center gap-4 px-6 py-5 rounded-2xl border border-gray-700 " +
      "bg-gray-900/40 text-white hover:border-yellow-400 hover:bg-yellow-400/10 transition text-left";

    const box = document.createElement("span");
    const text = document.createElement("span");
    text.className = "font-semibold";
    text.textContent = label;

    card.appendChild(box);
    card.appendChild(text);

    function updateVisual() {
      if (selected.has(label)) {
        box.className =
          "w-5 h-5 rounded-md border flex items-center justify-center border-yellow-400 bg-yellow-400/20";
        card.classList.add("border-yellow-400");
      } else {
        box.className =
          "w-5 h-5 rounded-md border flex items-center justify-center border-gray-500 bg-white";
        card.classList.remove("border-yellow-400");
        card.classList.add("border-gray-700");
      }
    }

    card.addEventListener("click", () => {
      if (selected.has(label)) selected.delete(label);
      else selected.add(label);

      answers[q.id] = Array.from(selected);
      persist();

      nextBtn.disabled = selected.size < minSelected;
      updateVisual();
    });

    updateVisual();
    questionBody.appendChild(card);
  });
}

nextBtn.addEventListener("click", async () => {
  const isLast = currentIndex === questions.length - 1;

  if (!isLast) {
    currentIndex++;
    renderQuestion();
    return;
  }

  persist();
  
  // Integração com o Back-end para gerar o treino
  try {
    nextBtn.disabled = true;
    nextBtn.textContent = "Gerando Treino...";

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    // Mapeamento das respostas para o formato esperado pelo algoritmo KNN do back-end
    const formatarOpcao = (val) => {
      if (!val || val === "Não consigo fazer") return 0;
      if (val === "1-5") return 3;
      if (val === "5-10") return 8;
      if (val === "10-20") return 15;
      if (val === "+20") return 25;
      if (val === "10-20" && answers.prancha === val) return 15; // Caso especial prancha
      if (val === "21-30") return 25;
      if (val === "31-60") return 45;
      if (val === "+60") return 70;
      return parseInt(val) || 0;
    };

    const dadosParaEnvio = {
      respostas: {
        flexaoInclinada: formatarOpcao(answers.flexaoInclinada),
        flexaoPadrao: formatarOpcao(answers.flexaoPadrao),
        barraAustraliana: formatarOpcao(answers.barraAustraliana),
        barraFixa: formatarOpcao(answers.barraFixa),
        agachamentoSofa: formatarOpcao(answers.agachamentoSofa),
        agachamentoPadrao: formatarOpcao(answers.agachamentoPadrao),
        prancha: formatarOpcao(answers.prancha),
        abdominalSupra: formatarOpcao(answers.abdominalSupra)
      },
      objetivo: answers.objetivo || "Sair do sedentarismo",
      diasDisponiveis: parseInt(answers.recorrencia) || 3,
      equipamentos: answers.equipamentos || []
    };

    const response = await fetch('http://localhost:3333/treino/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosParaEnvio)
    });

    if (response.ok) {
      const fichaTreino = await response.json();
      localStorage.setItem('fichaTreino', JSON.stringify(fichaTreino));
      
      // Tentar salvar no banco se o usuário estiver logado
      if (usuarioLogado && usuarioLogado.identificador) {
        try {
          await fetch(`http://localhost:3333/treino/salvar/${usuarioLogado.identificador}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fichaTreino })
          });
        } catch (e) { console.warn("Não foi possível salvar o treino no banco de dados."); }
      }
      
      window.location.href = "rotina.html";
    } else {
      alert("Erro ao gerar treino. Tente novamente.");
      nextBtn.disabled = false;
      nextBtn.textContent = "Finalizar";
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
    nextBtn.disabled = false;
    nextBtn.textContent = "Finalizar";
  }
});

if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });
}
// Verificar se o usuário já respondeu o questionário
function verificarQuestionarioRespondido() {
  const fichaTreino = localStorage.getItem('fichaTreino');
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  if (fichaTreino && usuarioLogado) {
    // Usuário já respondeu o questionário, redirecionar para o dashboard
    window.location.href = 'dashboard.html';
  }
}
verificarQuestionarioRespondido();
// Inicial
renderQuestion();