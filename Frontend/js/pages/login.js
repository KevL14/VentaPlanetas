import { addUser, getAllUsers } from '../api/userService.js';
import { setActiveUser } from '../userSession.js'; // o donde tengas tu manejo de sesión

export function loginPage() {
  const login = document.createElement("div");
  login.id = "login";

  login.innerHTML = `
    <div class="wrapper">
      <div class="card-switch">
        <label class="switch">
          <input type="checkbox" class="toggle">
          <span class="slider"></span>
          <span class="card-side"></span>

          <!-- login  -->
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div class="title">Log in</div>
              <form id="loginForm" class="flip-card__form" autocomplete="off">
                <input class="flip-card__input" name="email" placeholder="Email" type="email" required>
                <input class="flip-card__input" name="password" placeholder="Password" type="password" required>
                <button type="submit" class="flip-card__btn">Lets go!</button>
              </form>
              <div id="loginError" style="color: red; margin-top: 10px;"></div>
            </div>

            <!-- register  -->
            <div class="flip-card__back">
              <div class="title">Sign up</div>
              <form id="registerForm" class="flip-card__form" autocomplete="off">
                <input class="flip-card__input" name="name" placeholder="Name" type="text" required>
                <input class="flip-card__input" name="email" placeholder="Email" type="email" required>
                <input class="flip-card__input" name="password" placeholder="Password (min 6 chars)" type="password" required>
                <input class="flip-card__input" name="age" placeholder="Age" type="number" min="0" required>
                <button type="submit" class="flip-card__btn">Confirm!</button>
              </form>
              <div id="registerError" style="color: red; margin-top: 10px;"></div>
              <div id="registerSuccess" style="color: green; margin-top: 10px;"></div>
            </div>
          </div>
        </label>
      </div>   
    </div>
  `;

  // LOGIN
  const loginForm = login.querySelector('#loginForm');
  const loginError = login.querySelector('#loginError');

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    loginError.textContent = '';

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      loginError.textContent = 'Por favor ingrese email y contraseña.';
      return;
    }

    try {
      // Obtener todos los usuarios para verificar login (idealmente usar endpoint backend que devuelva por email)
      const users = await getAllUsers();

      // Buscar usuario con email y contraseña iguales
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (!user) {
        loginError.textContent = 'Email o contraseña incorrectos.';
        return;
      }

      // Guardar usuario activo y redirigir
      setActiveUser(user);
      location.hash = '/'; // o a donde quieras redirigir

    } catch (err) {
      loginError.textContent = 'Error al iniciar sesión. Intente más tarde.';
      console.error(err);
    }
  });

  // REGISTER
  const registerForm = login.querySelector('#registerForm');
  const registerError = login.querySelector('#registerError');
  const registerSuccess = login.querySelector('#registerSuccess');

  registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    registerError.textContent = '';
    registerSuccess.textContent = '';

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();
    const age = parseInt(registerForm.age.value);

    // Validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password || isNaN(age)) {
      registerError.textContent = 'Por favor complete todos los campos.';
      return;
    }
    if (!emailRegex.test(email)) {
      registerError.textContent = 'Email no es válido.';
      return;
    }
    if (password.length < 6) {
      registerError.textContent = 'La contraseña debe tener mínimo 6 caracteres.';
      return;
    }
    if (age < 0) {
      registerError.textContent = 'La edad no puede ser negativa.';
      return;
    }

    try {
      // Verificar si email ya existe
      const users = await getAllUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        registerError.textContent = 'El email ya está registrado.';
        return;
      }

      // Crear usuario con credit 0 y admin false
      const newUser = {
        name,
        email,
        password,
        age,
        credit: 0,
        admin: false,
      };

      await addUser(newUser);

      registerSuccess.textContent = 'Usuario registrado correctamente. Ahora puede iniciar sesión.';
      registerForm.reset();

    } catch (err) {
      registerError.textContent = 'Error al registrar usuario. Intente más tarde.';
      console.error(err);
    }
  });

  return login;
}
