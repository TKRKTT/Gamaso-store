/**
 * @file Script principal para interatividade e dinamismo da página.
 * @summary Gerencia o menu de navegação móvel, a criação dinâmica de cards de produtos
 * e as animações de elementos ao rolar a página.
 * Roda após o carregamento completo do DOM para garantir que todos os elementos HTML estejam disponíveis.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- BLOCO 1: FUNCIONALIDADE DO MENU MÓVEL ---
    // Seleciona os elementos essenciais para o menu de navegação.
    const menuButton = document.getElementById('menu-button'); // O botão que abre/fecha o menu.
    const mobileMenu = document.getElementById('mobile-menu'); // O container do menu.
    const navLinks = mobileMenu.querySelectorAll('a'); // Todos os links dentro do menu.

    // Adiciona o evento de clique ao botão: exibe ou esconde o menu.
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); // 'toggle' adiciona a classe se não existir, e remove se existir.
    });

    // Adiciona um evento para cada link do menu, para que ele feche ao ser clicado.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // Garante que o menu sempre feche após a navegação.
        });
    });


    // --- BLOCO 2: GERAÇÃO DINÂMICA DOS CARDS DE PRODUTO ---
    // Array de objetos que define os dados de cada produto.
    // Alterar este array é o único passo necessário para adicionar, remover ou modificar produtos na página.
    const products = [
        { title: "Produto 1" },
        { title: "Produto 2" },
        { title: "Produto 3" },
        { title: "Produto 4" },
        { title: "Produto 5" },
        { title: "Produto 6" },
    ];

    // Seleciona o container no HTML onde os produtos serão inseridos.
    const productGrid = document.getElementById('product-grid');
    
    // Boa prática: verifica se o elemento container realmente existe antes de manipulá-lo.
    if (productGrid) {
        // Itera sobre o array de produtos para criar um card para cada um.
        products.forEach((product) => {
            // Cria o elemento <article> que servirá como o card do produto.
            const productElement = document.createElement('article');
            // Adiciona a classe 'reveal', preparando o card para a animação de rolagem.
            productElement.classList.add('reveal');
            
            // ===== ALTERAÇÃO AQUI =====
            // Define o conteúdo HTML do card com as classes ajustadas para um visual mais compacto.
            productElement.innerHTML = `
                <div class="group product-card-hover text-left h-full">
                    <div class="bg-brand-gray border border-brand-gold/20 rounded-lg shadow-lg overflow-hidden h-full flex flex-col p-4">
                        <img src="https://placehold.co/400x400/0a0a0a/D4AF37?text=${encodeURI(product.title)}" 
                             alt="Imagem do ${product.title}" 
                             class="w-full h-36 object-cover rounded-md mb-3">
                        
                        <div class="flex flex-col flex-grow">
                            <h3 class="text-lg font-bold text-brand-gold mb-2">${product.title}</h3>
                            <p class="text-gray-400 text-sm">Aqui entrará uma breve descrição para o ${product.title.toLowerCase()}.</p>
                        </div>
                    </div>
                </div>
            `;
            // Adiciona o card recém-criado como um filho do grid de produtos.
            productGrid.appendChild(productElement);
        });
    }


    // --- BLOCO 3: ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA ---
    // Seleciona todos os elementos que devem aparecer suavemente ao rolar.
    const revealElements = document.querySelectorAll('.reveal');

    // Cria um 'observador' que verifica quando um elemento entra na área visível da tela (viewport).
    // Esta é a abordagem moderna e performática para animações de scroll.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 'isIntersecting' é true se o elemento está visível.
            if (entry.isIntersecting) {
                // Adiciona a classe 'active', que ativa a transição CSS.
                entry.target.classList.add('active');
                // Para de observar o elemento após a animação para economizar recursos.
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando pelo menos 10% do elemento está visível.
    });

    // Aplica o observador a cada elemento com a classe '.reveal'.
    revealElements.forEach(el => {
        observer.observe(el);
    });

});