import {
  getAllUsers,
  getUserById,
  getUsersByName,
  addUser,
  editUser,
  deleteUser,
} from '../../api/userService.js';

export async function userCrudPage() {
  const page = document.createElement('div');
  page.id = 'userCrudPage';

  page.innerHTML = `
    <h1>Gestión de Usuarios</h1>

    <form id="userForm">
      <input type="hidden" id="userId">

      <label>Nombre:</label>
      <input type="text" id="name" required>

      <label>Correo:</label>
      <input type="email" id="email" required>

      <label>Contraseña:</label>
      <input type="password" id="password" required>

      <label>Edad:</label>
      <input type="number" id="age" min="0" required>

      <label>Crédito (₡):</label>
      <input type="number" id="credit" min="0" step="1" value="0" required>

      <label>Administrador:</label>
      <select id="admin" required>
        <option value="">Seleccione...</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>

      <button type="submit">Guardar Usuario</button>
    </form>

    <h2>Usuarios registrados</h2>
    <input type="text" id="searchUsers" placeholder="Buscar por ID, nombre o correo...">

    <table id="usersTable" border="1" style="width: 100%; text-align: center;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Edad</th>
          <th>Crédito (₡)</th>
          <th>Admin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const form = page.querySelector('#userForm');
  const userIdInput = page.querySelector('#userId');
  const nameInput = page.querySelector('#name');
  const emailInput = page.querySelector('#email');
  const passwordInput = page.querySelector('#password');
  const ageInput = page.querySelector('#age');
  const creditInput = page.querySelector('#credit');
  const adminSelect = page.querySelector('#admin');
  const usersTableBody = page.querySelector('#usersTable tbody');
  const searchUsersInput = page.querySelector('#searchUsers');

  let users = [];

  async function loadUsers() {
    users = await getAllUsers();
    renderUsers(users);
  }

  function renderUsers(list) {
    usersTableBody.innerHTML = '';
    if (!list?.length) {
      usersTableBody.innerHTML = '<tr><td colspan="8">No hay usuarios registrados.</td></tr>';
      return;
    }
    list.forEach(u => {
      usersTableBody.innerHTML += `
        <tr>
          <td>${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.password}</td>
          <td>${u.age}</td>
          <td>₡${u.credit ?? 0}</td>
          <td>${u.admin ? 'Sí' : 'No'}</td>
          <td>
            <button class="editBtn" data-id="${u.id}">✏️</button>
            <button class="deleteBtn" data-id="${u.id}">🗑️</button>
          </td>
        </tr>
      `;
    });

    page.querySelectorAll('.editBtn').forEach(btn => {
      btn.onclick = async () => {
        const id = parseInt(btn.dataset.id);
        const user = users.find(u => u.id === id);
        if (!user) return;

        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        passwordInput.value = user.password;
        ageInput.value = user.age;
        creditInput.value = user.credit ?? 0;
        adminSelect.value = user.admin.toString();
      };
    });

    page.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.onclick = async () => {
        if (confirm('¿Está seguro de eliminar este usuario?')) {
          const id = parseInt(btn.dataset.id);
          await deleteUser(id);
          await loadUsers();
        }
      };
    });
  }

  searchUsersInput.oninput = () => {
    const term = searchUsersInput.value.toLowerCase();
    const filtered = users.filter(u =>
      u.id.toString().includes(term) ||
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.credit && u.credit.toString().includes(term))
    );
    renderUsers(filtered);
  };
  form.onsubmit = async e => {
    e.preventDefault();

    const userData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
      age: parseInt(ageInput.value),
      credit: Math.max(0, parseInt(creditInput.value)), // mínimo 0
      admin: adminSelect.value === 'true',
    };

    const id = userIdInput.value;
    try {
      if (id) {
        await editUser(parseInt(id), userData);
      } else {
        await addUser(userData);
      }
      form.reset();
      userIdInput.value = '';
      await loadUsers();
    } catch (error) {
      console.error('Error guardando usuario:', error);
      alert('Error al guardar usuario');
    }
  };

  await loadUsers();

  return page;
}
