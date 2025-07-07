const BASE_URL = 'http://localhost:8080/api/users';

// 🔹 Obtener todos los usuarios
export async function getAllUsers() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener usuarios');
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getUsers:', error);
    return null;
  }
}

// 🔹 Obtener usuario por ID
export async function getUserById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Usuario con ID ${id} no encontrado`);
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getUserById:', error);
    return null;
  }
}

// 🔹 Agregar nuevo usuario
export async function addUser(user) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Error del servidor:', errorText);
      throw new Error(`Error al agregar usuario: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('🚨 Error en addUser():', error);
    throw error;
  }
}

// Buscar usuarios por nombre (parcial o completo)
export async function getUsersByName(name) {
  try {
    const res = await fetch(`${BASE_URL}/search?name=${encodeURIComponent(name)}`);
    if (!res.ok) {
      if (res.status === 204) return []; // no content -> no usuarios
      throw new Error(`Error al buscar usuarios con nombre: ${name}`);
    }
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getUsersByName:', error);
    return [];
  }
}

// 🔹 Editar usuario
export async function editUser(id, user) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!res.ok) throw new Error(`Error al editar usuario con ID ${id}`);
    return await res.json();
  } catch (error) {
    console.error('❌ Error en editUser:', error);
    throw error;
  }
}

// 🔹 Eliminar usuario
export async function deleteUser(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error(`Error al eliminar usuario con ID ${id}`);
    return true;
  } catch (error) {
    console.error('❌ Error en deleteUser:', error);
    return false;
  }
}
