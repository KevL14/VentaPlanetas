import { getLots, editLot, getLotById } from '../api/lotService.js';
import { createInvoice } from '../api/invoiceService.js';
import { getActiveUser, setActiveUser } from '../userSession.js';
import { editUser } from '../api/userService.js';

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

    <div id="purchaseModal" class="modal" style="display:none;">
      <div class="modal-content">
        <h2>Confirmar Compra</h2>
        <div id="modalDetails"></div>
        <label for="passwordInput">Ingresa tu contraseña para confirmar:</label>
        <input type="password" id="passwordInput" placeholder="Contraseña">
        <div id="passwordError" style="color:red; margin-top:0.5rem;"></div>
        <div class="modal-actions">
          <button id="confirmPurchase">Comprar</button>
          <button id="cancelPurchase">Cancelar</button>
        </div>
      </div>
    </div>
  `;

  const lotsGrid = shopping.querySelector('#lotsGrid');
  const filterBtn = shopping.querySelector('#filterBtn');
  const searchInput = shopping.querySelector('#searchInput');
  const filterType = shopping.querySelector('#filterType');
  const minPrice = shopping.querySelector('#minPrice');
  const maxPrice = shopping.querySelector('#maxPrice');

  const purchaseModal = shopping.querySelector('#purchaseModal');
  const modalDetails = shopping.querySelector('#modalDetails');
  const confirmPurchaseBtn = shopping.querySelector('#confirmPurchase');
  const cancelPurchaseBtn = shopping.querySelector('#cancelPurchase');
  const passwordInput = shopping.querySelector('#passwordInput');
  const passwordError = shopping.querySelector('#passwordError');

  let lots = [];
  let selectedLot = null;
  const user = getActiveUser();

  try {
    const allLots = await getLots();
    lots = allLots.filter(l => l.ownerId == null);

    lots.forEach(lot => {
      if (!lot.celestialPairType) {
        const planets = ['marte', 'venus', 'ceres'];
        lot.celestialPairType = planets.includes(lot.celestialPair.toLowerCase()) ? 'planet' : 'moon';
      }
    });

    renderLots(lots);
  } catch (error) {
    console.error('Error cargando lotes:', error);
    lotsGrid.innerHTML = `<p style="color:red;">Error cargando lotes.</p>`;
  }

  function renderLots(list) {
    if (!list.length) {
      lotsGrid.innerHTML = '<p>No hay lotes disponibles por el momento.</p>';
      return;
    }

    lotsGrid.innerHTML = list.map(lot => `
      <div class="lot-card" data-aos="fade-up">
        <img src="/Frontend/images/Pages/shopping/${lot.celestialPair}.png" alt="${lot.place}">
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

    lotsGrid.querySelectorAll('.buy-btn').forEach(btn => {
      btn.onclick = async () => {
        const lotId = btn.dataset.id;
        selectedLot = await getLotById(lotId);
        showModal(selectedLot);
      };
    });
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
      const matchesPrice = (isNaN(min) || lot.price >= min) && (isNaN(max) || lot.price <= max);
      return matchesText && matchesType && matchesPrice;
    });

    renderLots(filtered);
  }

  function showModal(lot) {
    modalDetails.innerHTML = `
      <p><strong>Lugar:</strong> ${lot.place}</p>
      <p><strong>Planeta/Luna:</strong> ${lot.celestialPair}</p>
      <p><strong>Tamaño:</strong> ${lot.squareSize} m²</p>
      <p><strong>Precio:</strong> ₡${lot.price.toLocaleString('es-CR')}</p>
      <hr>
      <p><strong>Usuario:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Crédito actual:</strong> ₡${user.credit.toLocaleString('es-CR')}</p>
    `;

    passwordInput.value = '';
    passwordError.textContent = '';

    purchaseModal.style.display = 'flex';
  }

  cancelPurchaseBtn.onclick = () => {
    purchaseModal.style.display = 'none';
    selectedLot = null;
    passwordInput.value = '';
    passwordError.textContent = '';
  };

  confirmPurchaseBtn.onclick = async () => {
    if (!selectedLot) return;

    const enteredPassword = passwordInput.value.trim();
    if (!enteredPassword) {
      passwordError.textContent = 'Por favor ingresa tu contraseña.';
      return;
    }

    if (enteredPassword !== user.password) {
      passwordError.textContent = 'Contraseña incorrecta.';
      return;
    }

    if (user.credit < selectedLot.price) {
      alert('❌ Fondos insuficientes.');
      return;
    }

    try {
      // Restar crédito del usuario
      user.credit -= selectedLot.price;

      // Guardar usuario actualizado en backend y sesión
      await editUser(user.id, user);
      await setActiveUser(user);

      // Asignar ownerId al lote
      selectedLot.ownerId = user.id;
      await editLot(selectedLot.id, selectedLot);

      // Crear factura
      const invoice = {
        lotId: selectedLot.id,
        ownerId: user.id,
        userName: user.name,
        date: new Date().toISOString().split('T')[0],
        amount: selectedLot.price
      };
      await createInvoice(invoice);

      purchaseModal.style.display = 'none';

      // Navegar a /confirmPay
      location.hash = '/confirmPay';

    } catch (err) {
      console.error('Error durante la compra:', err);
      alert('❌ Ocurrió un error durante la compra.');
    }
  };

  filterBtn.onclick = applyFilters;
  searchInput.oninput = applyFilters;
  filterType.onchange = applyFilters;
  minPrice.oninput = applyFilters;
  maxPrice.oninput = applyFilters;

  return shopping;
}
