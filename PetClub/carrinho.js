// ---- CARRINHO ----

let carrinho = [];

function addCart(nome, preco, img) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.qty++;
  } else {
    carrinho.push({ nome, preco, img: img || '', qty: 1 });
  }
  atualizarCarrinho();
  abrirCarrinho();
}

function removerItem(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
  const total_itens = carrinho.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('carrinho-badge');
  if (badge) badge.textContent = total_itens;

  const lista = document.getElementById('carrinho-lista');
  const total_preco = document.getElementById('carrinho-total');
  if (!lista) return;

  if (carrinho.length === 0) {
    lista.innerHTML = '<p style="color:#999;text-align:center;margin-top:30px;">O carrinho está vazio.</p>';
    if (total_preco) total_preco.textContent = '€0,00';
    return;
  }

  lista.innerHTML = carrinho.map(i => `
    <div style="display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #eee;">
      <div style="width:50px;height:50px;background:#fff3e8;border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">
        ${i.img ? `<img src="${i.img}" style="width:100%;height:100%;object-fit:contain;padding:4px;">` : ''}
      </div>
      <div style="flex:1;">
        <p style="margin:0;font-size:13px;font-weight:bold;color:#333;">${i.nome}</p>
        <p style="margin:4px 0 0;font-size:12px;color:#ff7b25;">${i.preco} x ${i.qty}</p>
      </div>
      <button onclick="removerItem('${i.nome}')" style="background:none;border:none;cursor:pointer;color:#999;font-size:18px;line-height:1;">x</button>
    </div>
  `).join('');

  const total = carrinho.reduce((s, i) => {
    const val = parseFloat(i.preco.replace('€','').replace(',','.'));
    return s + val * i.qty;
  }, 0);

  if (total_preco) total_preco.textContent = '€' + total.toFixed(2).replace('.', ',');
}

function abrirCarrinho() {
  const painel = document.getElementById('carrinho-painel');
  const overlay = document.getElementById('carrinho-overlay');
  if (painel) painel.classList.add('aberto');
  if (overlay) overlay.classList.add('aberto');
}

function fecharCarrinho() {
  const painel = document.getElementById('carrinho-painel');
  const overlay = document.getElementById('carrinho-overlay');
  if (painel) painel.classList.remove('aberto');
  if (overlay) overlay.classList.remove('aberto');
}
