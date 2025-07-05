import { home } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { perfilePage } from './pages/perfile.js';
import { contactPage } from './pages/contact.js';
import { shoppingPage } from './pages/shopping.js';

const routes = {
  '/': home,
  '/login': loginPage,
  '/shopping': shoppingPage,
  '/contactUs': contactPage,
  '/perfile': perfilePage,
};

let routerTimeout;

export async function router() {
  console.log('Router ejecutado', new Date().toISOString());

  const path = location.hash.slice(1) || '/';
  const page = routes[path];

  const app = document.getElementById('app');
  app.innerHTML = '';

  if (page) {
    const content = await page();
    app.appendChild(content);
  } else {
    app.innerHTML = '<h2>404 - Página no encontrada</h2>';
  }

  viewComponets(path);
}

function viewComponets(pathPage) {
  document.getElementById('navbar').style.display = pathPage === '/login' ? 'none' : 'flex';
  document.getElementById('footer').style.display = pathPage === '/login' ? 'none' : 'block';
}

window.addEventListener('hashchange', () => {
  clearTimeout(routerTimeout);
  routerTimeout = setTimeout(router, 50); // Espera 50ms para evitar dobles llamadas rápidas
});

window.addEventListener('load', router);
