export function adminCrudsPages() {
  const adminCruds = document.createElement("div");
  adminCruds.id = "adminCrudsPage";

  adminCruds.innerHTML = `
    <section class="admin-dashboard">
      <h1 class="admin-title">🌌 Panel de Administración SpaceLot</h1>
      <p class="admin-subtitle">Gestiona usuarios, lotes y facturas espaciales con facilidad</p>
      
      <div class="admin-options">
        <button class="admin-btn" id="btnUserCrud">👤 Gestión de Usuarios</button>
        <button class="admin-btn" id="btnLotCrud">🪐 Gestión de Lotes</button>
        <button class="admin-btn" id="btnInvoiceCrud">📄 Gestión de Facturas</button>
        <button class="admin-btn back" id="btnBackHome">🏠 Volver al Inicio</button>
      </div>
    </section>
  `;

  // Navegación con hash
  adminCruds.querySelector("#btnUserCrud").onclick = () => location.hash = '/userCrud';
  adminCruds.querySelector("#btnLotCrud").onclick = () => location.hash = '/lotCrud';
  adminCruds.querySelector("#btnInvoiceCrud").onclick = () => location.hash = '/invoiceCrud';
  adminCruds.querySelector("#btnBackHome").onclick = () => location.hash = '/';

  return adminCruds;
}
