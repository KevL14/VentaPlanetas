import {
  getAllInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../../api/invoiceService.js';

import {
  getUsersByName,
  getUserById,
  getAllUsers
} from '../../api/userService.js';

import {
  getLotsWithoutOwner,
  getLotById,
  editLot,
} from '../../api/lotService.js';

export async function invoiceCrudPage() {
  const page = document.createElement('div');
  page.id = 'invoiceCrudPage';

  page.innerHTML = `
    <h1>Gestión de Facturas Espaciales</h1>

    <form id="invoiceForm">
      <input type="hidden" id="invoiceId">

      <label>Lote (solo lotes sin dueño):</label>
      <input type="text" id="lotSearch" placeholder="Buscar lote por nombre o ID...">
      <select id="lotSelect" required>
        <option value="">Seleccione lote...</option>
      </select>

      <label>Usuario (buscador):</label>
      <input type="text" id="userSearch" placeholder="Buscar usuario por nombre o ID...">
      <select id="userSelect" required>
        <option value="">Seleccione usuario...</option>
      </select>

      <label>Fecha:</label>
      <input type="date" id="date" required>

      <label>Monto (₡):</label>
      <input type="number" step="0.01" id="amount" readonly>

      <button type="submit">Guardar Factura</button>
    </form>

    <h2>Facturas registradas</h2>
    <input type="text" id="searchInvoices" placeholder="Buscar facturas por ID, usuario o lote...">
    <table id="invoicesTable" border="1" style="width: 100%; text-align: center;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Lote</th>
          <th>Usuario</th>
          <th>Fecha</th>
          <th>Monto (₡)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const form = page.querySelector('#invoiceForm');
  const lotSelect = page.querySelector('#lotSelect');
  const lotSearch = page.querySelector('#lotSearch');
  const userSearch = page.querySelector('#userSearch');
  const userSelect = page.querySelector('#userSelect');
  const amountInput = page.querySelector('#amount');
  const dateInput = page.querySelector('#date');
  const invoicesTableBody = page.querySelector('#invoicesTable tbody');
  const searchInvoicesInput = page.querySelector('#searchInvoices');
  const invoiceIdInput = page.querySelector('#invoiceId');

  let invoices = [];
  let users = [];
  let allLots = [];

  async function loadLots() {
    allLots = await getLotsWithoutOwner();
    renderLots(allLots);
  }

  function renderLots(lots) {
    lotSelect.innerHTML = '<option value="">Seleccione lote...</option>';
    lots.forEach(lot => {
      lotSelect.innerHTML += `<option value="${lot.id}">${lot.celestialPair} - ${lot.place} [ID:${lot.id}]</option>`;
    });
  }

  function renderUsers(usersList) {
    userSelect.innerHTML = '<option value="">Seleccione usuario...</option>';
    usersList.forEach(user => {
      userSelect.innerHTML += `<option value="${user.id}">${user.name} [ID:${user.id}]</option>`;
    });
  }

  async function searchUsers(query) {
    if (!query.trim()) {
      users = await getAllUsers();
    } else {
      const isNumeric = !isNaN(query);
      users = isNumeric ? [await getUserById(query)] : await getUsersByName(query);
    }
    renderUsers(users.filter(Boolean));
  }

  async function loadInvoices() {
    invoices = await getAllInvoices();
    renderInvoices(invoices);
  }

  function renderInvoices(list) {
    invoicesTableBody.innerHTML = '';
    if (!list?.length) {
      invoicesTableBody.innerHTML = '<tr><td colspan="6">No hay facturas registradas.</td></tr>';
      return;
    }
    list.forEach(inv => {
      invoicesTableBody.innerHTML += `
        <tr>
          <td>${inv.id}</td>
          <td>${inv.lotId}</td>
          <td>${inv.userName} [ID:${inv.ownerId}]</td>
          <td>${inv.date}</td>
          <td>₡${inv.amount.toFixed(2)}</td>
          <td>
            <button class="editBtn" data-id="${inv.id}">✏️</button>
            <button class="deleteBtn" data-id="${inv.id}">🗑️</button>
          </td>
        </tr>
      `;
    });

    page.querySelectorAll('.editBtn').forEach(btn => {
      btn.onclick = async () => {
        const invoice = invoices.find(i => i.id == btn.dataset.id);
        if (!invoice) return;

        invoiceIdInput.value = invoice.id;
        lotSelect.innerHTML = `<option value="${invoice.lotId}">${invoice.lotId}</option>`;
        lotSelect.value = invoice.lotId;
        dateInput.value = invoice.date;
        amountInput.value = invoice.amount;

        if (!users.find(u => u.id == invoice.ownerId)) {
          const u = await getUserById(invoice.ownerId);
          users.push(u);
        }

        renderUsers(users.filter(Boolean));
        userSelect.value = invoice.ownerId;
      };
    });

    page.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.onclick = async () => {
        if (confirm('¿Está seguro de eliminar esta factura?')) {
          const id = parseInt(btn.dataset.id);
          const invoice = invoices.find(i => i.id == id);
          await deleteInvoice(id);
          const lot = await getLotById(invoice.lotId);
          lot.ownerId = null;
          await editLot(invoice.lotId, lot);
          await loadInvoices();
          await loadLots();
        }
      };
    });
  }

  lotSelect.onchange = async () => {
    const lotId = lotSelect.value;
    if (!lotId) return amountInput.value = '';
    const lot = await getLotById(parseInt(lotId));
    if (lot) amountInput.value = lot.price.toFixed(2);
  };

  userSearch.oninput = () => {
    searchUsers(userSearch.value);
  };

  lotSearch.oninput = () => {
    const term = lotSearch.value.toLowerCase();
    const filtered = allLots.filter(l =>
      l.celestialPair.toLowerCase().includes(term) ||
      l.place.toLowerCase().includes(term) ||
      l.id.toString().includes(term)
    );
    renderLots(filtered);
  };

  form.onsubmit = async e => {
    e.preventDefault();
    if (!lotSelect.value || !userSelect.value || !dateInput.value) {
      return alert('Por favor complete todos los campos requeridos.');
    }

    const newInvoice = {
      lotId: parseInt(lotSelect.value),
      ownerId: parseInt(userSelect.value),
      userName: userSelect.options[userSelect.selectedIndex].text.split(' [ID:')[0],
      date: dateInput.value,
      amount: parseFloat(amountInput.value),
    };

    const id = invoiceIdInput.value;
    try {
      if (id) {
        await updateInvoice(parseInt(id), newInvoice);
      } else {
        await createInvoice(newInvoice);
        const lot = await getLotById(newInvoice.lotId);
        lot.ownerId = newInvoice.ownerId;
        await editLot(newInvoice.lotId, lot);
      }
      form.reset();
      invoiceIdInput.value = '';
      amountInput.value = '';
      userSelect.innerHTML = '<option value="">Seleccione usuario...</option>';
      lotSelect.value = '';
      await loadInvoices();
      await loadLots();
      users = await getAllUsers();
      renderUsers(users);
    } catch (error) {
      console.error('Error guardando factura:', error);
      alert('Error al guardar factura');
    }
  };

  searchInvoicesInput.oninput = () => {
    const term = searchInvoicesInput.value.toLowerCase();
    const filtered = invoices.filter(inv =>
      inv.userName.toLowerCase().includes(term) ||
      inv.lotId.toString().includes(term) ||
      inv.id.toString().includes(term) ||
      inv.ownerId.toString().includes(term)
    );
    renderInvoices(filtered);
  };

  await loadLots();
  await loadInvoices();
  users = await getAllUsers();
  renderUsers(users);

  return page;
}
