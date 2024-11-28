// Carrinho de compras
const cart = [];

// Função para adicionar produto ao carrinho
function addToCart(id, name, price) {
    const existingProduct = cart.find(product => product.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const finalizeButton = document.getElementById('buy-cart');
    
    cartContainer.innerHTML = ''; // Limpa a interface do carrinho

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>O carrinho está vazio.</p>';
        totalContainer.innerHTML = ''; // Limpa o total quando o carrinho está vazio
        finalizeButton.style.display = 'none';  // Esconde o botão de compra
        return;
    }

    finalizeButton.style.display = 'block';  // Mostra o botão de compra
    let total = 0; // Variável para calcular o total da compra

    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = 'cart-item';

        const productImage = getProductImageById(product.id);

        item.innerHTML = `
            <img src="${productImage}" alt="${product.name}">
            <div class="item-details">
                <span>${product.name} (x${product.quantity})</span>
                <span>R$ ${(product.price * product.quantity).toFixed(2)}</span>
            </div>
            <button class="remove-button" onclick="removeFromCart(${product.id})">Remover</button>
        `;
        cartContainer.appendChild(item);

        total += product.price * product.quantity; // Adiciona o valor do produto ao total
    });

    totalContainer.innerHTML = `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
}

// Função para finalizar a compra e exibir a mensagem de sucesso
function finalizePurchase() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const finalizeButton = document.getElementById('buy-cart');

    // Substitui o conteúdo do carrinho com a mensagem de sucesso
    cartContainer.innerHTML = ''; // Limpa os itens do carrinho antes de adicionar a mensagem
    const successMessage = document.createElement('p');
    successMessage.className = 'success-message';  // Aplica a classe para estilizar a mensagem
    successMessage.innerHTML = '<strong>Compra concluída com sucesso!</strong>';
    cartContainer.appendChild(successMessage);  // Adiciona a mensagem no contêiner

    totalContainer.innerHTML = ''; // Limpa o total da compra
    finalizeButton.style.display = 'none'; // Esconde o botão de comprar após a compra ser concluída

    // Limpa o carrinho
    cart.length = 0;
    updateCartUI(); // Atualiza a interface para refletir o carrinho vazio
}

// Função para remover produto do carrinho
function removeFromCart(id) {
    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    updateCartUI();
}

// Função que retorna a imagem do produto com base no id
function getProductImageById(id) {
    const images = {
        1: 'img/imagem7.avif',
        2: 'img/imagem3.jpg',
        3: 'img/imagem9.avif',
        5: 'img/imagem8.jpg',
        6: 'img/imagem4.png',
    };

    return images[id] || 'img/default.jpg'; // Retorna imagem padrão se o id não for encontrado
}

// Adicionar evento nos botões de "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = parseInt(button.dataset.id);
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        addToCart(id, name, price);
    });
});

// Abrir e fechar o carrinho
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart');
    const closeCart = document.getElementById('close-cart');

    // Abrir o carrinho
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cart.classList.remove('hidden');
        cart.style.display = 'block';
    });

    // Fechar o carrinho
    closeCart.addEventListener('click', () => {
        cart.classList.add('hidden');
        cart.style.display = 'none';
    });

    // Adicionando evento de clique no botão de finalizar compra
    const finalizeButton = document.getElementById('buy-cart');
    if (finalizeButton) {
        finalizeButton.addEventListener('click', finalizePurchase);
    }
});
