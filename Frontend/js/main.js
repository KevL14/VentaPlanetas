import { navbar } from './components/navbar.js'
import { footer } from './components/footer.js';
import { router } from './router.js';

document.getElementById('navbar').appendChild(navbar());
document.getElementById('footer').appendChild(footer());

window.addEventListener('DOMContentLoaded', () => router());
window.addEventListener('hashchange', () => router());
