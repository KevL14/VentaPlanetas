import { getActiveUser, clearActiveUser, setActiveUser } from '../userSession.js';
import { getInvoicesByOwnerId, deleteInvoice } from '../api/invoiceService.js';
import { getLotById, editLot } from '../api/lotService.js';
import { editUser } from '../api/userService.js';

export async function perfilePage() {
  const perfile = document.createElement("div");
  perfile.id = "perfile";
  perfile.dataset.aos = 'fade';
  perfile.dataset.aosDuration = '1000';

  const activeUser = getActiveUser();

  if (!activeUser || !activeUser.id) {
    perfile.innerHTML = `
      <section id="cont_InfoPerfile">
        <h2 style="text-align:center; margin-top:2rem;">Por favor inicia sesión para ver tu perfil.</h2>
      </section>
    `;
    return perfile;
  }

  perfile.innerHTML = `
    <section id="cont_InfoPerfile">
      <div id="infoOwn" class="cardPerfiles">
        <img id="photoPerfileUser" src="/Frontend/images/Pages/perfile/PhotosPerfile/perfile1.png" alt="PerfilePhoto">
        <h1 id="userName"></h1>
        <h2 id="ages"></h2>
        <table id="tbCountLots">
          <tr>
            <td id="countCompras">0</td>
            <td id="countFavoritos">0</td>
          </tr>
          <tr>
            <td>Compras</td>
            <td>Favoritos</td>
          </tr>
        </table>
      </div>
      <div id="cont_InfoFinancesLots">
        <div id="infoFinanceUser" class="cardPerfiles">
          <table>
            <tr>
              <td>Credito</td>
              <td id="userCredit"></td>
            </tr>
            <tr>
              <td>Invertido</td>
              <td id="userInvested"></td>
            </tr>
          </table>
        </div>
        <div id="infoLotsListOptions">
          <a class="cardPerfiles" id="btnFondos" style="cursor:pointer;">
            <img src="/Frontend/images/Pages/perfile/card-svg.svg" class="iconsListLots">
            Gestionar Fondos
          </a>
          <a class="cardPerfiles" id="btnCerrarSesion" style="cursor: pointer;">
            <img src="/Frontend/images/Pages/perfile/logout-svg.svg" class="iconsListLots">
            Cerrar sesión
          </a>
        </div>
      </div>
    </section>
    <section id="cont_ListLotsUser">
      <h1>Cargando lotes adquiridos...</h1>
    </section>
    <div id="creditModal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.6); justify-content:center; align-items:center; z-index:9999;">
      <div style="background:#fff; padding:1.5rem; border-radius:8px; width:320px; max-width:90vw; position:relative;">
        <h2 id="modalTitle">Gestionar Fondos</h2>
        <form id="creditForm">
          <label>Número de Tarjeta (Visa/Mastercard):
            <input type="text" name="cardNumber" maxlength="16" placeholder="1234 5678 9012 3456" required style="width:100%; margin-bottom: 0.25rem;">
            <div id="cardTypeIndicator" style="font-weight:bold; color:#555; font-size:0.9rem; height:1rem;"></div>
          </label>
          <label>Monto:
            <input type="number" name="amount" min="1" placeholder="₡" required style="width:100%; margin-bottom: 0.5rem;">
          </label>
          <label>Contraseña:
            <input type="password" name="password" placeholder="Tu contraseña" required style="width:100%; margin-bottom: 0.5rem;">
          </label>
          <div style="color:red; font-size:0.9rem; margin-bottom:0.5rem;" id="creditError"></div>
          <div style="display:flex; justify-content:space-between; gap:0.5rem;">
            <button type="submit" id="btnDepositar" style="flex:1; padding:0.5rem;">Depositar</button>
            <button type="button" id="btnRetirar" style="flex:1; padding:0.5rem;">Retirar</button>
          </div>
          <button type="button" id="creditCancelBtn" style="width:100%; margin-top:0.5rem; padding:0.5rem;">Cancelar</button>
        </form>
      </div>
    </div>
  `;

  const userNameEl = perfile.querySelector('#userName');
  const ageEl = perfile.querySelector('#ages');
  const creditEl = perfile.querySelector('#userCredit');
  const countComprasEl = perfile.querySelector('#countCompras');
  const userInvestedEl = perfile.querySelector('#userInvested');
  const listLotsUser = perfile.querySelector('#cont_ListLotsUser');
  const btnCerrarSesion = perfile.querySelector('#btnCerrarSesion');
  const btnFondos = perfile.querySelector('#btnFondos');
  const creditModal = perfile.querySelector('#creditModal');
  const creditForm = perfile.querySelector('#creditForm');
  const creditError = perfile.querySelector('#creditError');
  const creditCancelBtn = perfile.querySelector('#creditCancelBtn');
  const btnDepositar = perfile.querySelector('#btnDepositar');
  const btnRetirar = perfile.querySelector('#btnRetirar');
  const cardNumberInput = creditForm.querySelector('input[name="cardNumber"]');
  const cardTypeIndicator = perfile.querySelector('#cardTypeIndicator');

  userNameEl.textContent = activeUser.name;
  ageEl.textContent = activeUser.age;
  creditEl.textContent = activeUser.credit.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' });

  btnCerrarSesion.onclick = () => {
    if (confirm('¿Deseas cerrar sesión?')) {
      clearActiveUser();
      location.hash = '/login';
    }
  };

  btnFondos.onclick = () => {
    creditForm.reset();
    creditError.textContent = '';
    creditModal.style.display = 'flex';
    cardTypeIndicator.textContent = '';
  };

  creditCancelBtn.onclick = () => {
    creditModal.style.display = 'none';
  };

  cardNumberInput.addEventListener('input', () => {
    const num = cardNumberInput.value.replace(/\s+/g, '');
    let tipo = '';
    if (/^4/.test(num)) tipo = 'Visa';
    else if (/^(5[1-5])/.test(num) || /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(num)) tipo = 'Mastercard';
    else if (num) tipo = 'Desconocida';
    cardTypeIndicator.textContent = tipo ? `Tipo: ${tipo}` : '';
  });

  const validarTarjeta = card => {
    const regex = /^(4\d{15}|5[1-5]\d{14}|222[1-9]\d{12}|22[3-9]\d{13}|2[3-6]\d{14}|27[01]\d{13}|2720\d{12})$/;
    return regex.test(card.replace(/\s+/g, ''));
  };

  async function manejarOperacion(isDeposito) {
    creditError.textContent = '';
    const formData = new FormData(creditForm);
    const cardNumber = formData.get('cardNumber').replace(/\s+/g, '');
    const amount = parseFloat(formData.get('amount'));
    const password = formData.get('password');

    if (!validarTarjeta(cardNumber)) return creditError.textContent = 'Número de tarjeta inválido.';
    if (isNaN(amount) || amount <= 0) return creditError.textContent = 'Monto no válido.';
    if (password !== activeUser.password) return creditError.textContent = 'Contraseña incorrecta.';
    if (!isDeposito && activeUser.credit < amount) return creditError.textContent = 'Fondos insuficientes.';

    activeUser.credit += isDeposito ? amount : -amount;
    await editUser(activeUser.id, activeUser);
    await setActiveUser(activeUser);

    creditEl.textContent = activeUser.credit.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' });
    creditModal.style.display = 'none';
    alert(`${isDeposito ? 'Depósito' : 'Retiro'} exitoso por ₡${amount.toFixed(2)}`);
  }

  btnDepositar.onclick = async e => { e.preventDefault(); await manejarOperacion(true); };
  btnRetirar.onclick = async e => { e.preventDefault(); await manejarOperacion(false); };

  async function cargarLotes() {
    try {
      const invoices = await getInvoicesByOwnerId(activeUser.id);
      countComprasEl.textContent = invoices.length;

      if (invoices.length === 0) {
        userInvestedEl.textContent = '₡0.00';
        listLotsUser.innerHTML = `<h2>No se Encuentran Lotes Comprados</h2>`;
      } else {
        const totalInvertido = invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0);
        userInvestedEl.textContent = totalInvertido.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' });

        const lots = await Promise.all(invoices.map(inv => getLotById(inv.lotId)));

        listLotsUser.innerHTML = `
          <h2>Lotes Comprados</h2>
          <ul>
            ${invoices.map((inv, i) => {
              const lot = lots[i];
              return `
                <li class="lot-card">
                  <div class="lot-info">
                    <img src="/Frontend/images/Pages/shopping/${lot.celestialPair}.png" alt="${lot.place}" />
                    <p><strong>ID Factura:</strong> ${inv.id}</p>
                    <p><strong>Lugar:</strong> ${lot.place}</p>
                    <p><strong>Planeta/Luna:</strong> ${lot.celestialPair}</p>
                    <p><strong>Tamaño m2:</strong> ${lot.squareSize.toFixed(2)}</p>
                    <p><strong>Monto:</strong> ₡${inv.amount.toFixed(2)}</p>
                  </div>
                  <button class="btnRenunciar" 
                    data-lotid="${lot.id}" 
                    data-invoiceid="${inv.id}" 
                    data-amount="${inv.amount}" 
                    data-ownerid="${lot.ownerId}">
                    Renunciar
                  </button>
                </li>
              `;
            }).join('')}
          </ul>
        `;

        listLotsUser.querySelectorAll('.btnRenunciar').forEach(btn => {
          btn.addEventListener('click', async () => {
            const lotId = btn.dataset.lotid;
            const invoiceId = btn.dataset.invoiceid;
            const amount = parseFloat(btn.dataset.amount);
            const ownerId = parseInt(btn.dataset.ownerid);

            if (ownerId !== activeUser.id) {
              alert("No tienes permiso para renunciar a este lote.");
              return;
            }

            if (confirm('¿Seguro que deseas renunciar a esta propiedad?')) {
              try {
                const lot = await getLotById(lotId);
                lot.ownerId = null;
                await editLot(lotId, lot);
                console.log('Propiedad liberada correctamente.');

                await deleteInvoice(invoiceId);
                console.log('Factura eliminada correctamente.');

                activeUser.credit += amount;
                await editUser(activeUser.id, activeUser);
                await setActiveUser(activeUser);

                creditEl.textContent = activeUser.credit.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' });

                await cargarLotes();
                alert('Renuncia exitosa. El monto ha sido reintegrado a tu crédito.');
              } catch (error) {
                console.error('Error renunciando al lote:', error);
                alert('Ocurrió un error al intentar renunciar al lote.');
              }
            }
          });
        });
      }
    } catch (err) {
      console.error(err);
      userInvestedEl.textContent = '₡0.00';
      listLotsUser.innerHTML = `<h2>Error al cargar lotes.</h2>`;
    }
  }

  await cargarLotes();
  return perfile;
}
