const BASE_URL = 'http://localhost:8080/api/Lot';

export async function getLots(timeout = 1000) {
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
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lot)
  });
  return res.json();
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
