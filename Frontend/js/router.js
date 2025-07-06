import { home } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { perfilePage } from './pages/perfile.js';
import { contactPage } from './pages/contact.js';
import { shoppingPage } from './pages/shopping.js';
import { invoicingPage } from './pages/invoicing.js';
//others
import { confirmPayPage } from './pages/others/confirmPayment.js';
import { error404Page } from './pages/others/error404.js';
import { adminCrudsPages } from './pages/others/adminCrudsPages.js';
//cruds
import { lotCrudPage } from './pages/cruds/lotCrudPage.js';
import { userCrudPage } from './pages/cruds/userCrudPage.js';
import { invoiceCrudPage } from './pages/cruds/invoiceCrudPage.js';

const routes = {
  '/': adminCrudsPages,
  '/login': loginPage,
  '/shopping': shoppingPage,
  '/invoicing':invoicingPage,
  '/contactUs': contactPage,
  '/perfile': perfilePage,
  //others
  '/confirmPay':confirmPayPage,
  '/adminCrudsPages':adminCrudsPages,
  //cruds
  '/lotCrud':lotCrudPage,
  '/userCrud':userCrudPage,
  '/invoiceCrud':invoiceCrudPage,
};


let routerTimeout;
let lastPath = '';

export async function router() {
  const path = location.hash.slice(1) || '/';

  if (path === lastPath) {
    return; // No renderizar si no cambió la ruta
  }
  lastPath = path;

  const page = routes[path];
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (page) {
    const content = await page();

    // Si el contenido marca error, no mostrar 404, ya muestra mensaje
    if (content?.dataset?.error === 'true') {
      app.appendChild(content);
    } else {
      app.appendChild(content);
    }
  } else {
    app.appendChild(error404Page());
  }

  viewComponets(path);
}




function viewComponets(pathPage) {
  const isLogin = pathPage === '/login';
  const isConfirmPay = pathPage ==='/confirmPay'
  const is404 = !routes[pathPage]; // Detecta si es un error 404

  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('footer');

  if (navbar) navbar.style.display = isLogin || is404 || isConfirmPay? 'none' : 'flex';
  if (footer) footer.style.display = isLogin || is404 || isConfirmPay? 'none' : 'block';
}

window.addEventListener('hashchange', () => {
  clearTimeout(routerTimeout);
  routerTimeout = setTimeout(router, 50); // Espera 50ms para evitar dobles llamadas rápidas
});

window.addEventListener('load', router);
