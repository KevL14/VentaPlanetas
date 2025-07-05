const BASE_URL = 'http://localhost:8080/api/Lot';

export async function getLots() {
  const res = await fetch(BASE_URL);
  return res.json();
}

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
  return res.text(); // o json, depende qué devuelvas
}
