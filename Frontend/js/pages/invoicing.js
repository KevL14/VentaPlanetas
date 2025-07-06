export function invoicingPage() {
   var invoicing = document.createElement("div");
   invoicing.id = "invoicing";
      invoicing.dataset.aos = 'fade';
   invoicing.dataset.aosDuration = '1000';
   invoicing.innerHTML = `

    <div class="factura-contenedor">
  <!-- Lado izquierdo: Datos del usuario -->
  <div class="usuario-info">
    <h2>Factura</h2>
    <p><strong>Nombre:</strong><br>Ada Sánchez</p>
    <p><strong>Correo electrónico:</strong><br>ada.sanchez@example.com</p>
    <p><strong>Saldo actual:</strong><br>₡4200.00</p>

    <button class="boton-comprar">Comprar</button>
  </div>

  <!-- Lado derecho: Datos del lote -->
  <div class="lote-info">
    <img src="/Frontend/images/Pages/shopping/calisto.png" alt="Mar de Serenidad" class="lote-img">
    <h1 class="lote-nombre">Mar de Serenidad</h1>
    <p>Plutón</p>
    <p><strong>Tipo:</strong> 🌍 Planeta</p>
    <p><strong>Precio:</strong> ₡3000.00</p>
  </div>
</div>


   `;
    return invoicing;
}