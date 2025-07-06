import { getActiveUser } from '../userSession.js';
import { getInvoicesByOwnerId, deleteInvoice } from '../api/invoiceService.js';
import { getLotById, editLot } from '../api/lotService.js';

export async function perfilePage() {
  const perfile = document.createElement("div");
  perfile.id = "perfile";
  perfile.dataset.aos = 'fade';
  perfile.dataset.aosDuration = '1000';

  perfile.innerHTML = `
    <section id="cont_InfoPerfile">
      <div id="infoOwn" class="cardPerfiles" data-aos="fade-right" data-aos-delay="300" data-aos-duration="500">
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
        <div id="infoFinanceUser" class="cardPerfiles" data-aos="fade-left" data-aos-delay="500" data-aos-duration="500">
          <table>
            <tr>
              <td>CreditoActual</td>
              <td id="userCredit">C 0</td>
            </tr>
            <tr>
              <td>Invertido</td>
              <td id="userInvested">₡ 0</td>
            </tr>
          </table>
        </div>
        <div id="infoLotsListOptions">
          <a class="cardPerfiles" onclick="document.getElementById('cont_ListLotsUser').scrollIntoView({ behavior: 'smooth' });"
            data-aos="fade-up" data-aos-delay="900" data-aos-duration="500">
            <img src="/Frontend/images/Pages/perfile/card-svg.svg" class="iconsListLots">Depositar
          </a>
          <a class="cardPerfiles" onclick="document.getElementById('cont_ListLotsUser').scrollIntoView({ behavior: 'smooth' });"
            data-aos="fade-up" data-aos-delay="700" data-aos-duration="500">
            <img src="/Frontend/images/Pages/perfile/shoppingbag-svg.svg" class="iconsListLots">Ver Comprados
          </a>
        </div>
      </div>
    </section>

    <section id="cont_ListLotsUser">
      <h1>Cargando lotes adquiridos...</h1>
    </section>
  `;

  const userNameEl = perfile.querySelector('#userName');
  const ageEl = perfile.querySelector('#ages');
  const creditEl = perfile.querySelector('#userCredit');
  const countComprasEl = perfile.querySelector('#countCompras');
  const countFavoritosEl = perfile.querySelector('#countFavoritos');
  const userInvestedEl = perfile.querySelector('#userInvested');
  const listLotsUser = perfile.querySelector('#cont_ListLotsUser');

  const activeUser = getActiveUser();

  if (!activeUser) {
    userNameEl.textContent = 'Invitado';
    ageEl.textContent = '-';
    creditEl.textContent = 'C 0';
    listLotsUser.innerHTML = `<h2>Por favor inicia sesión para ver tus lotes adquiridos.</h2>`;
    return perfile;
  }

  userNameEl.textContent = activeUser.name;
  ageEl.textContent = activeUser.age;
  creditEl.textContent = `C ${activeUser.credit ?? 0}`;

  async function cargarLotes() {
    try {
      const invoices = await getInvoicesByOwnerId(activeUser.id);
      countComprasEl.textContent = invoices.length;
      countFavoritosEl.textContent = 0;

      const totalInvested = invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0);
      userInvestedEl.textContent = `₡ ${totalInvested.toFixed(2)}`;

      if (!invoices.length) {
        listLotsUser.innerHTML = `<h2>No se Encuentran Lotes Comprados</h2>`;
        return;
      }

      const lots = await Promise.all(invoices.map(inv => getLotById(inv.lotId)));

      listLotsUser.innerHTML = `
        <h2>Lotes Comprados</h2>
        <ul style="list-style:none; padding:0;">
          ${invoices.map((inv, i) => {
            const lot = lots[i];
            if (!lot) {
              return `<li>Lote con ID ${inv.lotId} no encontrado</li>`;
            }
            return `
              <li style="margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem;">
                <strong>Lugar:</strong> ${lot.place}<br>
                <strong>Planeta/Luna:</strong> ${lot.celestialPair}<br>
                <strong>Tipo:</strong> ${lot.typePlace || 'N/A'}<br>
                <strong>Precio:</strong> ₡${lot.price.toFixed(2)}<br>
                <strong>Fecha compra:</strong> ${inv.date}<br>
                <strong>Monto pagado:</strong> ₡${inv.amount.toFixed(2)}<br>
                <button data-lotid="${lot.id}" data-invoiceid="${inv.id}" class="btnRenunciar">❌ Renunciar</button>
              </li>
            `;
          }).join('')}
        </ul>
      `;

      listLotsUser.querySelectorAll('.btnRenunciar').forEach(btn => {
        btn.addEventListener('click', async () => {
          const lotId = parseInt(btn.dataset.lotid);
          const invoiceId = parseInt(btn.dataset.invoiceid);

          if (!confirm('¿Seguro que desea renunciar a este lote?')) return;

          try {
            // 1. Actualizar lote para remover ownerId
            const lot = await getLotById(lotId);
            lot.ownerId = null;
            await editLot(lotId, lot);

            // 2. Eliminar factura
            await deleteInvoice(invoiceId);

            // 3. Recargar
            await cargarLotes();
          } catch (err) {
            console.error('Error al renunciar al lote:', err);
            alert('Ocurrió un error al renunciar al lote');
          }
        });
      });

    } catch (error) {
      console.error('Error cargando facturas o lotes:', error);
      listLotsUser.innerHTML = `<h2>Error cargando lotes adquiridos.</h2>`;
    }
  }

  await cargarLotes();
  return perfile;
}
