export function confirmPayPage() {
  const confirmPay = document.createElement('div');
  confirmPay.id = 'confirmPayPage';

  confirmPay.innerHTML = `
    <div class="space-confirmPay">
      <div class="rocket">
        🚀
      </div>
      <h1>¡Pago Confirmado!</h1>
      <p>Gracias por comprar tu lote espacial. 🌌</p>
      <p>Pronto recibirás toda la información en tu perfil.</p>
      <button id="btnHome">Volver al inicio</button>
    </div>
  `;

  // Botón para ir al home
  confirmPay.querySelector('#btnHome').addEventListener('click', () => {
    location.hash = '#/';
  });

  return confirmPay;
}