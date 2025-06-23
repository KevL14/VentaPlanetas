import { home } from './pages/home.js';
import { loginPage } from './pages/login.js';

const routes = {
  '/': home,
  '/login': loginPage,
};

export function router() {
  const path = location.hash.slice(1) || '/';
  const page = routes[path];

  const app = document.getElementById('app');
  app.innerHTML = '';

  
  
  if (page) {
    app.appendChild(page());
  } else {
    app.innerHTML = '<h2>404 - Página no encontrada</h2>';
  }
  
  // Mostrar u ocultar navbar y footer según la ruta
  // segun la ruta, muestro los componentes necesarios
    viewComponets(path);
}

function viewComponets(pathPage){
  // Mostrar u ocultar navbar y footer según la ruta
  const hideInLogin = (pathPage === '/login');
  document.getElementById('navbar').style.display = hideInLogin ? 'none' : 'flex';
  document.getElementById('footer').style.display = hideInLogin ? 'none' : 'block';

}
