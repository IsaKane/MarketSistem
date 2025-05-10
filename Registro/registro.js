// Seleciona a div de mensagens
const mensagemDiv = document.getElementById("mensagem");

// Função para exibir mensagem de erro ou sucesso
function exibirMensagem(texto, tipo = "erro") {
  mensagemDiv.textContent = texto; 
  mensagemDiv.className = tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso";
  mensagemDiv.classList.remove("mensagem-oculta");

  // Oculta a mensagem após 3 segundos
  setTimeout(() => {
    mensagemDiv.classList.add("mensagem-oculta");
  }, 3000);
}

// Evento de envio do formulário de registro
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  // Coleta os valores dos campos
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar").value;

  // Recupera os usuários salvos no localStorage
  const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Verifica se o email já está cadastrado
  const emailJaExiste = usuariosSalvos.some(user => user.email === email);
  if (emailJaExiste) {
    exibirMensagem("Este email já está cadastrado.");
    return;
  }

  // Valida os requisitos da senha
  const requisitos = [
    [document.getElementById("tam"), senha.length >= 5],
    [document.getElementById("maiuscula"), /[A-Z]/.test(senha)],
    [document.getElementById("minuscula"), /[a-z]/.test(senha)],
    [document.getElementById("numero"), /[0-9]/.test(senha)],
    [document.getElementById("especial"), /[^A-Za-z0-9]/.test(senha)],
  ];

  let senhaValida = true;

  // Marca os requisitos atendidos
  requisitos.forEach(([el, valido]) => {
    el.classList.toggle("ok", valido); 
    senhaValida = senhaValida && valido;
  });

  // Se a senha não for válida
  if (!senhaValida) {
    exibirMensagem("A senha não atende aos requisitos.");
    return;
  }

  // Verifica se as senhas são iguais
  if (senha !== confirmar) {
    exibirMensagem("As senhas não são iguais.");
    return;
  }

  // Salva o novo usuário no localStorage
  usuariosSalvos.push({ email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));

  // Exibe mensagem de sucesso
  exibirMensagem("Cadastro realizado com sucesso!", "sucesso");

  // Redireciona para a página de login após 1.5 segundos
  setTimeout(() => {
    window.location.href = "../Login/login.html";
  }, 1500);
});

// Mostra ou esconde a lista de requisitos ao clicar no botão
document.getElementById("mostrarRequisitos").addEventListener("click", function () {
  const lista = document.getElementById("listaRequisitos");
  lista.style.display = lista.style.display === "block" ? "none" : "block";
});
