// Pega o elemento onde os produtos serão inseridos
const produtosDisponiveis = document.getElementById('produtosDisponiveis'); 

// Pega os produtos armazenados no localStorage ou inicia com array vazio
const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Função para exibir os produtos na tela
function exibirProdutos() {
  if (produtos.length === 0) {
    produtosDisponiveis.innerHTML = '<p style="color: gray; margin-left: 10px">Não há produtos cadastrados.</p>';
    return;
  }

  // Limpa a área de produtos
  produtosDisponiveis.innerHTML = '';

  // Cria um espaço para cada produto
  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('produto');
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
      <div class="actions">
        <input type="number" value="1" min="1" id="quantidade-${produto.id}">
        <button onclick="adicionarAoCarrinho('${produto.id}')">Adicionar ao Carrinho</button>
      </div>
    `;
    produtosDisponiveis.appendChild(card);
  });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
  const quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);
  const produto = produtos.find(p => p.id === id);
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o produto já está no carrinho
  const produtoExistente = carrinho.find(item => item.id === id);
  if (produtoExistente) {
    produtoExistente.qtd += quantidade;
  } else {
    carrinho.push({ ...produto, qtd: quantidade });
  }

  // Salva no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Atualiza contador visual
  atualizarContadorCarrinho();

  // Alerta de sucesso
  alert(`${quantidade} de ${produto.nome} adicionados ao carrinho.`);
}

// Função para atualizar o número de itens no ícone do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const totalItens = carrinho.reduce((total, item) => total + item.qtd, 0);
  document.getElementById('iconeCarrinho').setAttribute('data-count', totalItens);
}

// Inicializa a página carregando produtos e contador
exibirProdutos();
atualizarContadorCarrinho();
