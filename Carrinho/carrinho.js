// Seleciona elementos importantes da interface
const carrinhoContent = document.getElementById('carrinhoContent');
const totalPreco = document.getElementById('totalPreco');
const confirmacaoModal = document.getElementById('Confirmacao');

// Carrega o carrinho do localStorage ou array vazio se não houver
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let indiceParaExcluir = null;  

// Exibe os produtos do carrinho
function exibirCarrinho() {
  if (carrinho.length === 0) {
    carrinhoContent.innerHTML = '<p style="text-align: center; color: gray;">Seu carrinho está vazio.</p>';
    totalPreco.textContent = '0,00';
    return;
  }

  carrinhoContent.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('carrinho');
    card.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="carrinho-info">
        <h3>${item.nome}</h3>
        <p><strong>Preço:</strong> R$ ${parseFloat(item.preco).toFixed(2)}</p>
      </div>
      <div class="carrinho-actions">
        <input type="number" value="${item.qtd}" min="1" onchange="atualizarQuantidade(${index}, this.value)" />
        <button class="btn-remover" onclick="removerDoCarrinho(${index})">Remover</button>
      </div>
    `;
    carrinhoContent.appendChild(card);
    total += item.preco * item.qtd;
  });

  totalPreco.textContent = total.toFixed(2); 
}

// Atualiza a quantidade de um produto
function atualizarQuantidade(index, quantidade) {
  if (quantidade < 1) return;
  carrinho[index].qtd = parseInt(quantidade, 10);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirCarrinho();
}

// Inicia processo de remoção de produto
function removerDoCarrinho(index) {
  indiceParaExcluir = index;
  confirmacaoModal.style.display = 'flex';
}

// Confirma a exclusão do produto
document.getElementById('confirmarExclusao').addEventListener('click', () => {
  if (indiceParaExcluir !== null) {
    carrinho.splice(indiceParaExcluir, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
    indiceParaExcluir = null;
  }
  confirmacaoModal.style.display = 'none';
});

// Cancela a exclusão do produto
document.getElementById('cancelarExclusao').addEventListener('click', () => {
  indiceParaExcluir = null;
  confirmacaoModal.style.display = 'none';
});

// Finaliza a compra
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  alert('Compra finalizada com sucesso!');
  // Limpa o carrinho
  localStorage.removeItem('carrinho'); 
  exibirCarrinho();
}

// Inicializa o carrinho ao carregar a página
exibirCarrinho();
