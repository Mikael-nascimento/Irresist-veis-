//preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.opacity = 'opacity 0.5s ease';
    this.setTimeout(() => preloader.style.display = 'none', 500)
});

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({behavior: 'smooth'});
        }
    });
});
//
let carrinho = [];

function adicionarItem(nome, preco) {
  const qtdInput = event.target.parentElement.querySelector('.quantidade');
  const quantidade = parseInt(qtdInput.value);
  
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }
  
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-pedido');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = "";
  let total = 0;
  
  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} x${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button onclick="removerItem(${index})">X</button>
    `;
    lista.appendChild(li);
    total += item.preco * item.quantidade;
  });
  
  totalSpan.textContent = total.toFixed(2);
}

function fazerPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Quero fazer um pedido:%0A";
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
  });

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  mensagem += `%0ATotal: R$ ${total.toFixed(2)}%0A`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const mapa = `https://www.google.com/maps?q=${lat},${lon}`;
      mensagem += `%0AMinha localização: ${mapa}`;
      enviarWhatsApp(mensagem);
    });
  } else {
    enviarWhatsApp(mensagem);
  }
}

function enviarWhatsApp(msg) {
  const telefone = "552499261253x"; // Coloque seu número aqui
  const url = `https://wa.me/${telefone}?text=${msg}`;
  window.open(url, "_blank");
}
