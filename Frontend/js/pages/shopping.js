import { getLots } from '../api/lotService.js';

export async function shoppingPage() {
  const shopping = document.createElement("div");
  
  shopping.id = "shopping";
  shopping.dataset.aos = 'fade';
  shopping.dataset.aosDuration = '1000';
  shopping.innerHTML="";
  shopping.innerHTML = `
    <section class="shopping-container">
      <h1 class="shopping-title">🛒 Explora y Compra Tu Lote Espacial</h1>

      <div class="filter-bar">
        <input type="text" id="searchInput" placeholder="Buscar sector, planeta, etc.">
        <select id="filterType">
          <option value="">Tipo</option>
          <option value="planeta">🌍 Planeta</option>
          <option value="luna">🌙 Luna</option>
        </select>
        <input type="number" id="minPrice" placeholder="₡ Mínimo">
        <input type="number" id="maxPrice" placeholder="₡ Máximo">
        <button id="filterBtn">Filtrar</button>
      </div>

      <div id="lotsGrid" class="lots-grid">Cargando lotes...</div>
    </section>
  `;

  const lotsGrid = shopping.querySelector('#lotsGrid');

 try {
  const lots = await getLots();

  if (lots === null) {
    // Erro al cargar los datos
    shopping.setAttribute('data-error', 'true');
    lotsGrid.innerHTML = `
      <p style="color: red;">
        🚫 Servidor Desabilitado. Por favor, inténtalo más tarde.
      </p>
    `;
  } else if (lots.length === 0) {
    // Cuando no hay lotes
    lotsGrid.innerHTML = '<p>No hay lotes disponibles por el momento.</p>';
  } else {
    //cuando si hay lotes
    lotsGrid.innerHTML = lots.map(lot => `
      <div class="lot-card" data-aos="fade-up">
        <img src="/Frontend/images/Pages/shopping/${lot.celestialPair}.png" alt="${lot.place || 'Lote Espacial'}">
        <div class="lot-description">
          <h3>${lot.place}</h3>
          <p>${lot.celestialPair}</p>
        </div>
        <div class="lot-overlay">
          <span class="tag tipo">${lot.tipo === 'luna' ? '🌙 Luna' : '🌍 Planeta'}</span>
          <span class="tag precio">₡${lot.price}</span>
        </div>
        <button class="buy-btn" data-id="${lot.id}">Comprar</button>
      </div>
    `).join('');
  }
} catch (error) {
  // Cuando el Servidor este Caido
  console.error('Error inesperado cargando lotes:', error);
  shopping.setAttribute('data-error', 'true');
  lotsGrid.innerHTML = `
    <p style="color: red;">
      🚫 Error Inesperado Desconocido. Por favor, inténtalo más tarde.
    </p>
  `;
}


  return shopping;
}
