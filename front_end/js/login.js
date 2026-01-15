function botao_Entrar(){
  const botao_entrar = document.getElementById("botao_Entrar")
  const botao_cad = document.getElementById("botao_Cadastro")
  botao_entrar.style.backgroundColor = "#FBBF24";
  botao_cad.style.backgroundColor = "#1F2937"
  localStorage.setItem("tipoL", "Entrar");
  window.location.reload();
}

function botao_Cadastro(){
  const botao_entrar = document.getElementById("botao_Entrar")
  const botao_cad = document.getElementById("botao_Cadastro")
  botao_entrar.style.backgroundColor = "#1F2937";
  botao_cad.style.backgroundColor = "#FBBF24"
  localStorage.setItem("tipoL", "Cadastro");
  window.location.reload();
}

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
            <input type="text" id="cnpj" name="cnpj" maxlength="18" placeholder="00.000.000/0000-00">
        </div>`;
}

const tipo = localStorage.getItem("tipo");
const campo = document.getElementById("areaCampos");
const tipoL = localStorage.getItem("tipoL") || "Entrar";
campo.innerHTML = "";

const botao_entrar = document.getElementById("botao_Entrar")
const botao_cad = document.getElementById("botao_Cadastro")
const botao_login = document.getElementById("botao_login")

if (tipoL === "Entrar") {
  botao_entrar.style.backgroundColor = "#FBBF24";
  botao_cad.style.backgroundColor = "#1F2937";
  botao_login.innerText = "Entrar";
  email();
  senha();
} else {
  botao_entrar.style.backgroundColor = "#1F2937";
  botao_cad.style.backgroundColor = "#FBBF24";
  botao_login.innerText = "Criar conta";
  
  if (tipo === "cidadao") {
    nomeUsuario();
  } else if (tipo === "empresa") {
    telefone();
    cnpj();
    nomeEmpresa();
  } else if (tipo === "servidorPublico") {
    telefone();
    cpf();
    nomeUsuario();
  }
  email();
  senha();
}

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (tipoL === "Entrar") {
    // Lógica de Login
    try {
      const response = await fetch(`http://localhost:3333/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("usuarioLogado", JSON.stringify(user));
        alert(`Bem-vindo, ${user.nome}!`);
        window.location.href = "home.html";
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao conectar com o servidor.");
    }
  } else {
    // Lógica de Cadastro
    let rota = tipo === "servidorPublico" ? "servidorPublico" : tipo;
    try {
      const response = await fetch(`http://localhost:3333/${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso! Agora faça login.");
        localStorage.setItem("tipoL", "Entrar");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Falha no cadastro: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }
});
