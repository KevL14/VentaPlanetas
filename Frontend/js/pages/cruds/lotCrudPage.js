import {
  getLots,
  getLotById,
  addLot,
  editLot,
  deleteLot,
} from '../../api/lotService.js';

const CELESTIAL_PAIRS = [
  'calisto', 'ceres', 'dione', 'europa', 'ganimedes',
  'luna', 'marte', 'pluton', 'rhea', 'titan', 'venus'
];

const PLACE_TYPES = [
  'montaña', 'cráter', 'mar', 'desierto', 'valle', 'llanura', 'meseta'
];

const PLANETS = ['marte', 'venus', 'ceres'];

export async function lotCrudPage() {
  const page = document.createElement('div');
  page.id = 'lotCrudPage';

  page.innerHTML = `
    <h1>Gestión de Lotes Espaciales</h1>

    <form id="lotForm">
      <input type="hidden" id="lotId">

      <label>Par celeste:</label>
      <select id="celestialPair" required>
        <option value="">Seleccione...</option>
        ${CELESTIAL_PAIRS.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>

      <label>Ubicación exacta:</label>
      <input type="text" id="place" required>

      <label>Tipo de lugar:</label>
      <select id="typePlace" required>
        <option value="">Seleccione...</option>
        ${PLACE_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
      </select>

      <label>Tamaño (m²):</label>
      <input type="number" id="squareSize" min="1" required>

      <label>Precio (₡):</label>
      <input type="number" id="price" min="0" step="0.01" required>

      <button type="submit">Guardar Lote</button>
    </form>

    <h2>Filtros de búsqueda</h2>

    <label>Tipo de par celeste:</label>
    <select id="typeFilter">
      <option value="">Todos</option>
      <option value="planet">Planetas</option>
      <option value="moon">Lunas</option>
    </select>

    <label>Precio mínimo (₡):</label>
    <input type="number" id="priceMin" min="0" step="0.01" placeholder="Mínimo">

    <label>Precio máximo (₡):</label>
    <input type="number" id="priceMax" min="0" step="0.01" placeholder="Máximo">

    <input type="text" id="searchLots" placeholder="Buscar por ID, lugar, par celeste o tipo...">

    <h2>Lotes registrados</h2>
    <table id="lotsTable" border="1" style="width: 100%; text-align: center;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Par Celeste</th>
          <th>Tipo Celeste</th> <!-- NUEVA COLUMNA -->
          <th>Ubicación</th>
          <th>Tipo</th>
          <th>Tamaño (m²)</th>
          <th>Precio (₡)</th>
          <th>Dueño ID</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody></tbody>
    </table>
  `;

  const form = page.querySelector('#lotForm');
  const lotIdInput = page.querySelector('#lotId');
  const celestialPair = page.querySelector('#celestialPair');
  const place = page.querySelector('#place');
  const typePlace = page.querySelector('#typePlace');
  const squareSize = page.querySelector('#squareSize');
  const price = page.querySelector('#price');

  const priceMin = page.querySelector('#priceMin');
  const priceMax = page.querySelector('#priceMax');
  const searchLots = page.querySelector('#searchLots');
  const typeFilter = page.querySelector('#typeFilter');

  const lotsTableBody = page.querySelector('#lotsTable tbody');

  let lots = [];

  async function loadLots() {
    lots = await getLots();
    renderLots(lots);
  }

  function getCelestialType(pair) {
    return PLANETS.includes(pair.toLowerCase()) ? 'planet' : 'moon';
  }

  function renderLots(list) {
    lotsTableBody.innerHTML = '';
    if (!list?.length) {
      lotsTableBody.innerHTML = '<tr><td colspan="8">No hay lotes registrados.</td></tr>';
      return;
    }
    list.forEach(lot => {
      const type = getCelestialType(lot.celestialPair);
      lotsTableBody.innerHTML += `
        <tr data-type="${type}">
          <td>${lot.id}</td>
          <td>${lot.celestialPair}</td>
          <td>${type}</td> <!-- aquí se muestra planet o moon -->
          <td>${lot.place}</td>
          <td>${lot.typePlace}</td>
          <td>${lot.squareSize}</td>
          <td>₡${lot.price.toFixed(2)}</td>
          <td>${lot.ownerId ?? '-'}</td>
          <td>
            <button class="editBtn" data-id="${lot.id}">✏️</button>
            <button class="deleteBtn" data-id="${lot.id}">🗑️</button>
          </td>
        </tr>
      `;
    });

    page.querySelectorAll('.editBtn').forEach(btn => {
      btn.onclick = async () => {
        const lot = lots.find(l => l.id == btn.dataset.id);
        if (!lot) return;
        lotIdInput.value = lot.id;
        celestialPair.value = lot.celestialPair;
        place.value = lot.place;
        typePlace.value = lot.typePlace;
        squareSize.value = lot.squareSize;
        price.value = lot.price;
      };
    });

    page.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.onclick = async () => {
        if (confirm('¿Eliminar este lote?')) {
          await deleteLot(btn.dataset.id);
          await loadLots();
        }
      };
    });
  }

  function filterLots() {
    const term = searchLots.value.toLowerCase();
    const min = parseFloat(priceMin.value);
    const max = parseFloat(priceMax.value);
    const type = typeFilter.value;

    const filtered = lots.filter(lot => {
      const lotType = getCelestialType(lot.celestialPair);

      const matchesText =
        lot.id.toString().includes(term) ||
        lot.place.toLowerCase().includes(term) ||
        lot.celestialPair.toLowerCase().includes(term) ||
        lot.typePlace.toLowerCase().includes(term);

      const priceValid =
        (isNaN(min) || lot.price >= min) &&
        (isNaN(max) || lot.price <= max);

      const typeValid = type === '' || lotType === type;

      return matchesText && priceValid && typeValid;
    });

    renderLots(filtered);
  }

  searchLots.oninput = filterLots;
  priceMin.oninput = filterLots;
  priceMax.oninput = filterLots;
  typeFilter.oninput = filterLots;

  form.onsubmit = async e => {
    e.preventDefault();
    const pairValue = celestialPair.value;
    const newLot = {
      celestialPair: pairValue,
      celestialPairType: getCelestialType(pairValue),
      place: place.value,
      typePlace: typePlace.value,
      squareSize: parseFloat(squareSize.value),
      price: parseFloat(price.value)
    };

    const id = lotIdInput.value;
    try {
      if (id) {
        await editLot(parseInt(id), newLot);
      } else {
        await addLot(newLot);
      }
      form.reset();
      await loadLots();
    } catch (error) {
      alert('Error al guardar el lote');
      console.error(error);
    }
  };

  await loadLots();
  return page;
}
