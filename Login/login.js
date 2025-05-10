// Seleciona a div de mensagens
const mensagemDiv = document.getElementById("mensagem");

// Função para exibir mensagem de erro ou sucesso
function exibirMensagem(texto, tipo = 'erro') {
  mensagemDiv.textContent = texto; 
  mensagemDiv.className = tipo === 'erro' ? 'mensagem-erro' : 'mensagem-sucesso';
  mensagemDiv.classList.remove('mensagem-oculta');

  // Oculta a mensagem após 3 segundos
  setTimeout(() => {
    mensagemDiv.classList.add('mensagem-oculta');
  }, 3000);
}

// Adiciona o evento de envio ao formulário
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtém os valores dos campos
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  // Recupera os usuários cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se existe um usuário com o email informado
  const usuario = usuarios.find(user => user.email === email);

  // Se não encontrar, mostra erro
  if (!usuario) {
    exibirMensagem("Usuário não cadastrado.");

  // Se a senha estiver errada
  } else if (usuario.senha !== senha) {
    exibirMensagem("Senha incorreta.");

  // Se estiver tudo certo, mostra sucesso e redireciona
  } else {
    exibirMensagem("Login realizado com sucesso!", "sucesso");

    // Redireciona para a página principal após 800ms
    setTimeout(() => {
      window.location.href = "../Index/index.html";
    }, 800);
  }
});