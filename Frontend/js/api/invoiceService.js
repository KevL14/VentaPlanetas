const BASE_URL = 'http://localhost:8080/api/invoices';

// Obtener todas las facturas
export async function getAllInvoices() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener facturas');
    return await res.json();
  } catch (err) {
    console.error('❌ Error en getAllInvoices:', err);
    return null;
  }
}

// Obtener facturas sin ownerId
export async function getInvoicesWithoutOwner() {
  try {
    const res = await fetch(`${BASE_URL}/no-owner`);
    if (!res.ok) throw new Error('Error al obtener facturas sin propietario');
    return await res.json();
  } catch (err) {
    console.error('❌ Error en getInvoicesWithoutOwner:', err);
    return null;
  }
}

// Obtener facturas por ownerId
export async function getInvoicesByOwnerId(ownerId) {
  try {
    const res = await fetch(`${BASE_URL}/owner/${ownerId}`);
    if (!res.ok) throw new Error('Error al obtener facturas del owner');
    return await res.json();
  } catch (err) {
    console.error(`❌ Error en getInvoicesByOwnerId(${ownerId}):`, err);
    return null;
  }
}

// Obtener una factura por su ID
export async function getInvoiceById(invoiceId) {
  try {
    const res = await fetch(`${BASE_URL}/${invoiceId}`);
    if (!res.ok) throw new Error('Error al obtener la factura');
    return await res.json();
  } catch (err) {
    console.error(`❌ Error en getInvoiceById(${invoiceId}):`, err);
    return null;
  }
}

// Crear nueva factura
export async function createInvoice(invoice) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice)
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }
    return await res.json();
  } catch (err) {
    console.error('❌ Error en createInvoice:', err);
    throw err;
  }
}

// Editar una factura completa
export async function updateInvoice(invoiceId, invoice) {
  try {
    const res = await fetch(`${BASE_URL}/${invoiceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice)
    });
    if (!res.ok) throw new Error('Error al editar la factura');
    return await res.json();
  } catch (err) {
    console.error(`❌ Error en updateInvoice(${invoiceId}):`, err);
    throw err;
  }
}

// Asignar nuevo ownerId a una factura
export async function assignOwnerToInvoice(invoiceId, ownerId) {
  try {
    const res = await fetch(`${BASE_URL}/${invoiceId}/assign-owner/${ownerId}`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Error al asignar propietario');
    return await res.json();
  } catch (err) {
    console.error(`❌ Error en assignOwnerToInvoice(${invoiceId}, ${ownerId}):`, err);
    throw err;
  }
}

// Eliminar una factura
export async function deleteInvoice(invoiceId) {
  try {
    const res = await fetch(`${BASE_URL}/${invoiceId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar factura');
    return await res.text(); // o .json() si devuelves algo
  } catch (err) {
    console.error(`❌ Error en deleteInvoice(${invoiceId}):`, err);
    throw err;
  }
}
