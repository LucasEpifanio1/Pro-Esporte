function nomeUsuario(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="nome">Nome Completo</label>
            <input type="text" id="nome" name="usuario" placeholder="Ex: João Silva" required>
        </div>`;
}

function email(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>`;
}

function telefone(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="telefone">Telefone de Contato</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>
        </div>`;
}

function cpf(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" name="CPF" placeholder="000.000.000-00" required>
        </div>`;
}

function senha(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha" placeholder="Crie uma senha segura" required>
        </div>`;
}

function nomeEmpresa(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="nomeEmpresa">Nome da Empresa</label>
            <input type="text" id="nomeEmpresa" name="nomeEmpresa" placeholder="Ex: Prefeitura Municipal" required>
        </div>`;
}

function cnpj(){
    campo.innerHTML += 
        `<div class="campo">
            <label for="cnpj">CNPJ</label>
            <input type="text" id="cnpj" name="cnpj" maxlength="18" placeholder="00.000.000/0000-00">
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

if (tipo === "funcionario") {
    nomeUsuario();
    email();
    telefone();
    cpf();
    senha();
}