export function shoppingPage() {
   var shopping = document.createElement("div");
   shopping.id = "shopping";
      shopping.dataset.aos = 'fade';
   shopping.dataset.aosDuration='1000';
   shopping.innerHTML = `
   
   <section id="shopping" class="shopping-container">
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

  <div class="lots-grid">

    <div class="lot-card">
      <img src="/Frontend/images/Pages/shopping/jupiterCalisto.png" alt="Sector Umbra">
      <div class="lot-description">
        <h3>Sector Umbra</h3>
        <p>Luna oculta en sombra permanente. Terreno perfecto para experimentos secretos.</p>
      </div>
      <div class="lot-overlay">
        <span class="tag tipo">🌙 Luna</span>
        <span class="tag precio">₡38,500</span>
      </div>
      <button class="buy-btn">Ver detalles</button>
    </div>

    <div class="lot-card">
      <img src="/Frontend/images/Pages/shopping/marte.png" alt="Sector Polaris">
      <div class="lot-description">
        <h3>Sector Polaris</h3>
        <p>Planeta con vista directa al núcleo galáctico. Clima estable y campo gravitacional suave.</p>
      </div>
      <div class="lot-overlay">
        <span class="tag tipo">🌍 Planeta</span>
        <span class="tag precio">₡92,000</span>
      </div>
      <button class="buy-btn">Ver detalles</button>
    </div>

    
    <div class="lot-card">
      <img src="/Frontend/images/Pages/shopping/venus.png" alt="Sector Polaris">
      <div class="lot-description">
        <h3>Sector Polaris</h3>
        <p>Planeta con vista directa al núcleo galáctico. Clima estable y campo gravitacional suave.</p>
      </div>
      <div class="lot-overlay">
        <span class="tag tipo">🌍 Planeta</span>
        <span class="tag precio">₡92,000</span>
      </div>
      <button class="buy-btn">Ver detalles</button>
    </div>

    

  </div>
</section>


   `;

   return shopping;
}