import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { router } from './router.js';
import AOS from 'https://cdn.skypack.dev/aos'; // <-- Import AOS desde Skypack

// Renderiza navbar y footer
document.getElementById('navbar').appendChild(navbar());
document.getElementById('footer').appendChild(footer());

// Inicializa el enrutador
window.addEventListener('DOMContentLoaded', () => {
  router();
  AOS.init();
});

window.addEventListener('hashchange', () => router());