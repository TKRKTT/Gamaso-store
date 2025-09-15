// Adiciona um listener que espera todo o conteúdo da página carregar para então executar o código.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA PARA GERAR PRODUTOS DINAMICAMENTE ---

    // Lista de produtos. Para adicionar um novo, basta copiar um bloco {...} e colar aqui.
    const products = [
        {
            imgSrc: "https://placehold.co/400x400/E8F5E9/333333?text=T%C3%B4nico",
            imgAlt: "Imagem do produto Tônico Finalizador Esmeralda",
            title: "Tônico Finalizador Esmeralda",
            description: "Fortalece e protege, estimulando o crescimento capilar."
        },
        {
            imgSrc: "https://placehold.co/400x400/E8F5E9/333333?text=P-DTOX",
            imgAlt: "Imagem do produto P-DTOX D-Pantenol",
            title: "P-DTOX D-Pantenol",
            description: "Força e resistência para fios mais saudáveis e vivos."
        },
        {
            imgSrc: "https://placehold.co/400x400/E8F5E9/333333?text=M%C3%A1scara",
            imgAlt: "Imagem do produto Máscara P-DTOX 12 Óleos",
            title: "Máscara P-DTOX 12 Óleos",
            description: "Nutrição profunda e brilho intenso com uma combinação poderosa de óleos."
        }
    ];

    const productGrid = document.getElementById('product-grid');
    
    // Verifica se o container dos produtos existe antes de tentar preenchê-lo
    if (productGrid) {
        products.forEach(product => {
            // Para cada produto na lista, cria o elemento HTML correspondente
            const productElement = document.createElement('article'); // Usando <article> para semântica
            productElement.classList.add('reveal', 'h-full'); // Garante que o article ocupe a altura total
            
            productElement.innerHTML = `
                <a href="#" class="group block product-card-hover text-left h-full" aria-label="Ver detalhes de ${product.title}">
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                        <img src="${product.imgSrc}" 
                             alt="${product.imgAlt}" 
                             class="w-full h-40 object-cover">
                        <div class="p-4 flex flex-col flex-grow">
                            <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
                            <p class="text-gray-500 text-sm">${product.description}</p>
                        </div>
                    </div>
                </a>
            `;
            productGrid.appendChild(productElement);
        });
    }

    // --- 2. LÓGICA PARA ANIMAÇÃO AO ROLAR A PÁGINA ---

    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na tela...
            if (entry.isIntersecting) {
                // ...adiciona a classe 'active' para ativar a animação do CSS
                entry.target.classList.add('active');
                // Opcional: para de observar o elemento depois que ele já apareceu
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento estiver visível
    });

    // Pede ao observer para "vigiar" cada elemento com a classe .reveal
    revealElements.forEach(el => {
        observer.observe(el);
    });

});