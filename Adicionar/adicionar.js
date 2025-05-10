// Seleciona elementos importantes da interface
const formProduto = document.getElementById('formProduto');
const inputImagem = document.getElementById('inputImagem');
const listaProduto = document.querySelector('.lista-produto');
const mensagemVazia = document.querySelector('.mensagem-vazia');
const mensagemDiv = document.getElementById('mensagem');

// Carrega o carrinho do localStorage 
let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Salva a lista atualizada no localStorage
function salvarProdutos() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Exibe mensagens para o usuário
function exibirMensagem(texto, tipo = 'erro') {
  mensagemDiv.textContent = texto;
  mensagemDiv.className = tipo === 'erro' ? 'mensagem-erro' : 'mensagem-sucesso';
  mensagemDiv.classList.remove('mensagem-oculta');

  setTimeout(() => {
    mensagemDiv.classList.add('mensagem-oculta');
  }, 4000);
} 

// Renderiza todos os produtos cadastrados na interface
function renderizarProdutos() {
  listaProduto.innerHTML = '';
  if (produtos.length === 0) {
    mensagemVazia.style.display = 'block';
    return;
  }

  mensagemVazia.style.display = 'none';

  produtos.forEach((produto, index) => {
    const card = document.createElement('div');
    card.classList.add('card-produto');

    card.innerHTML = `
      <img src="${produto.imagem}" alt="Imagem do Produto" class="imagem-produto">
      <div>
        <p><strong>ID:</strong> ${produto.id}</p>
        <p><strong>Nome:</strong> ${produto.nome}</p>
        <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
        <button class="btn-editar" onclick="editarProduto(${index})"><i class="mdi mdi-pencil-box-multiple mdi-14px"> Editar</i></button>
        <button class="btn-excluir" onclick="excluirProduto(${index})"><i class="mdi mdi-delete mdi-14px"> Excluir</i></button>
      </div>
    `;

    listaProduto.appendChild(card);
  });
}

let indiceParaExcluir = null;

// Função para excluir produto com confirmação
function excluirProduto(index) {
  indiceParaExcluir = index;
  document.getElementById('Confirmacao').style.display = 'flex';
}

// Confirma ou cancela exclusão
document.getElementById('confirmarExclusao').addEventListener('click', () => {
  if (indiceParaExcluir !== null) {
    produtos.splice(indiceParaExcluir, 1);
    salvarProdutos();
    renderizarProdutos();
    exibirMensagem('Produto excluído com sucesso!', 'sucesso');
    indiceParaExcluir = null;
  }
  document.getElementById('Confirmacao').style.display = 'none';
});

document.getElementById('cancelarExclusao').addEventListener('click', () => {
  indiceParaExcluir = null;
  document.getElementById('Confirmacao').style.display = 'none';
});

// Função para carregar dados no formulário ao clicar em "Editar"
function editarProduto(index) {
  const produto = produtos[index];
  document.querySelectorAll('#formProduto input')[0].value = produto.id;
  document.querySelectorAll('#formProduto input')[1].value = produto.nome;
  document.querySelectorAll('#formProduto input')[2].value = produto.preco;
  produtos.splice(index, 1); 
  salvarProdutos();
  renderizarProdutos();
  exibirMensagem('Edite os dados e clique em cadastrar produto.', 'sucesso');
}

// Evento ao enviar o formulário de cadastro
formProduto.addEventListener('submit', function (e) {
  e.preventDefault();
  const id = formProduto.querySelectorAll('input')[0].value.trim();
  const nome = formProduto.querySelectorAll('input')[1].value.trim();
  const preco = formProduto.querySelectorAll('input')[2].value.trim();
  const imagemFile = inputImagem.files[0];

  if (produtos.some(p => p.id === id)) {
    exibirMensagem('Já existe um produto com esse ID.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const novoProduto = {
      id,
      nome,
      preco,
      imagem: reader.result
    };

    produtos.push(novoProduto);
    salvarProdutos();
    renderizarProdutos();
    formProduto.reset();
    exibirMensagem('Produto cadastrado com sucesso!', 'sucesso');
  };
  reader.readAsDataURL(imagemFile);
});

// Chama a função ao carregar a página para mostrar os produtos
renderizarProdutos();