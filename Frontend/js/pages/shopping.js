import { getLots } from '../api/lotService.js';

export async function shoppingPage() {
  const shopping = document.createElement("div");

  shopping.id = "shopping";
  shopping.dataset.aos = 'fade';
  shopping.dataset.aosDuration = '1000';
  shopping.innerHTML = `
    <section class="shopping-container">
      <h1 class="shopping-title">🛒 Explora y Compra Tu Lote Espacial</h1>

      <div class="filter-bar">
        <input type="text" id="searchInput" placeholder="Buscar sector, planeta, etc.">
        <select id="filterType">
          <option value="">Tipo</option>
          <option value="planet">🌍 Planeta</option>
          <option value="moon">🌙 Luna</option>
        </select>
        <input type="number" id="minPrice" placeholder="₡ Mínimo">
        <input type="number" id="maxPrice" placeholder="₡ Máximo">
        <button id="filterBtn">Filtrar</button>
      </div>

      <div id="lotsGrid" class="lots-grid">Cargando lotes...</div>
    </section>
  `;

  const lotsGrid = shopping.querySelector('#lotsGrid');
  const searchInput = shopping.querySelector('#searchInput');
  const filterType = shopping.querySelector('#filterType');
  const minPrice = shopping.querySelector('#minPrice');
  const maxPrice = shopping.querySelector('#maxPrice');
  const filterBtn = shopping.querySelector('#filterBtn');

  let lots = [];

  try {
    const allLots = await getLots();
    if (allLots === null) {
      shopping.setAttribute('data-error', 'true');
      lotsGrid.innerHTML = `<p style="color: red;">🚫 Servidor Deshabilitado. Por favor, inténtalo más tarde.</p>`;
      return shopping;
    }

    lots = allLots.filter(l => l.ownerId == null);

    // Asignar celestialPairType dinámicamente
    lots.forEach(lot => {
      if (!lot.celestialPairType) {
        const planets = ['marte', 'venus', 'ceres'];
        lot.celestialPairType = planets.includes(lot.celestialPair.toLowerCase()) ? 'planet' : 'moon';
      }
    });

    renderLots(lots);

  } catch (error) {
    console.error('Error inesperado cargando lotes:', error);
    shopping.setAttribute('data-error', 'true');
    lotsGrid.innerHTML = `<p style="color: red;">🚫 Error Inesperado. Por favor, inténtalo más tarde.</p>`;
    return shopping;
  }

  function renderLots(list) {
    if (!list.length) {
      lotsGrid.innerHTML = '<p>No hay lotes disponibles por el momento.</p>';
      return;
    }

    lotsGrid.innerHTML = list.map(lot => `
      <div class="lot-card" data-aos="fade-up">
        <img src="/Frontend/images/Pages/shopping/${lot.celestialPair}.png" alt="${lot.place || 'Lote Espacial'}">
        <div class="lot-description">
          <h3>${lot.place}</h3>
          <p>${lot.celestialPair}</p>
        </div>
        <div class="lot-overlay">
          <span class="tag tipo">${lot.celestialPairType === 'moon' ? '🌙 Luna' : '🌍 Planeta'}</span>
          <span class="tag precio">₡${lot.price}</span>
        </div>
        <button class="buy-btn" data-id="${lot.id}">Comprar</button>
      </div>
    `).join('');
  }

  function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const type = filterType.value;
    const min = parseFloat(minPrice.value);
    const max = parseFloat(maxPrice.value);

    const filtered = lots.filter(lot => {
      const matchesText =
        lot.place.toLowerCase().includes(term) ||
        lot.celestialPair.toLowerCase().includes(term);

      const matchesType = !type || lot.celestialPairType === type;
      const matchesPrice =
        (isNaN(min) || lot.price >= min) &&
        (isNaN(max) || lot.price <= max);

      return matchesText && matchesType && matchesPrice;
    });

    renderLots(filtered);
  }

  filterBtn.onclick = applyFilters;
  searchInput.oninput = applyFilters;
  filterType.onchange = applyFilters;
  minPrice.oninput = applyFilters;
  maxPrice.oninput = applyFilters;

  return shopping;
}
