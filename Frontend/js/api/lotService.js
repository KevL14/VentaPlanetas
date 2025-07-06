const BASE_URL = 'http://localhost:8080/api/Lot';


// 🔹 Obtener lote por ID
export async function getLotById(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Lote con ID ${id} no encontrado`);
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getLotById:', error);
    return null;
  }
}

// Nuevo método para obtener lotes sin propietario
export async function getLotsWithoutOwner() {
  try {
    const res = await fetch(`${BASE_URL}/no-owner`);
    if (!res.ok) throw new Error('Error al obtener lotes sin propietario');
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getLotsWithoutOwner:', error);
    return null;
  }
}
// Obtener lotes filtrados por tipo (planet o moon)
export async function getLotsByType(celestialPairType) {
  try {
    const res = await fetch(`${BASE_URL}/type/${celestialPairType}`);
    if (!res.ok) throw new Error(`Error al obtener lotes tipo ${celestialPairType}`);
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getLotsByType:', error);
    return null;
  }
}

// Obtener lotes filtrados por rango de precio
export async function getLotsByPriceRange(min, max) {
  try {
    const res = await fetch(`${BASE_URL}/price-range?min=${min}&max=${max}`);
    if (!res.ok) throw new Error(`Error al obtener lotes en rango de precio ${min} - ${max}`);
    return await res.json();
  } catch (error) {
    console.error('❌ Error en getLotsByPriceRange:', error);
    return null;
  }
}

export async function getLots(timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(BASE_URL, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error('Error en la respuesta del servidor');
    return await res.json();

  } catch (error) {
    console.error('Error en getLots:', error);
    return null; // Retorna null para indicar fallo
  }
}

// Las otras funciones las dejas igual
export async function addLot(lot) {
  try {
    // Elimina 'id' si es null, undefined o cadena vacía
    if (!lot.id) {
      delete lot.id;
    }

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lot)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Error del servidor:', errorText);
      throw new Error(`Error al guardar: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('🚨 Error al llamar addLot():', error);
    throw error;
  }
}



export async function editLot(id, lot) {
  const res = await fetch(`${BASE_URL}/edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lot)
  });
  return res.json();
}

export async function deleteLot(id) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: 'DELETE'
  });
  return res.text();
}
