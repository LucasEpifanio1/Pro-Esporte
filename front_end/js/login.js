function nomeUsuario() {
  campo.innerHTML += `<div class="campo">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" placeholder="Ex: João Silva" required>
        </div>`;
}

function email() {
  campo.innerHTML += `<div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>`;
}

function telefone() {
  campo.innerHTML += `<div class="campo">
            <label for="telefone">Telefone de Contato</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>
        </div>`;
}

function cpf() {
  campo.innerHTML += `<div class="campo">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="CPF" placeholder="000.000.000-00" required>
        </div>`;
}

function senha() {
  campo.innerHTML += `<div class="campo">
            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Crie uma senha segura" required>
        </div>`;
}

function nomeEmpresa() {
  campo.innerHTML += `<div class="campo">
            <label for="nomeEmpresa">Nome da Empresa</label>
            <input type="text" id="nomeEmpresa" name="nome" placeholder="Ex: Prefeitura Municipal" required>
        </div>`;
}

function cnpj() {
  campo.innerHTML += `<div class="campo">
            <label for="cnpj">CNPJ</label>
            <input type="text" id="cnpj" name="CNPJ" maxlength="18" placeholder="00.000.000/0000-00">
        </div>`;
}

const tipo = localStorage.getItem("tipo");
const campo = document.getElementById("areaCampos");
campo.innerHTML = "";

if (tipo === "cidadao") {
  nomeUsuario();
  email();
  senha();
}

if (tipo === "empresa") {
  nomeEmpresa();
  email();
  telefone();
  cnpj();
  senha();
}

if (tipo === "servidorPublico") {
  nomeUsuario();
  email();
  telefone();
  cpf();
  senha();
}

//(22/11) daqui para baixo: Fiz isso para poder me retornar uma mensagem dependendo do que acontecer e as demais mudanças estão comentadas.
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede o recarregamento da página

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  localStorage.setItem("email do criador de evento", data.email);

  // A rota de destino é determinada pelo tipo de usuário
  let rota = "";

  if (tipo === "cidadao") {
    rota = "cidadao";
  } else if (tipo === "empresa") {
    rota = "empresa";
  } else if (tipo === "servidorPublico") {
    rota = "servidorPublico";
  } else {
    console.error("Tipo de usuário não reconhecido.");
    return; // Sai da função se o tipo não for válido
  }

  try {
    const response = await fetch(`http://localhost:3333/${rota}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "home.html"; // Redireciona para a home
    } else {
      const errorData = await response.json();
      alert(`Falha no cadastro: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Erro ao tentar conectar com o servidor.");
  }
});
