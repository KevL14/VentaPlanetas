package VentaPlanetas.service;

import VentaPlanetas.model.Invoice;
import VentaPlanetas.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    // 🔹 Obtener todas las facturas
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // 🔹 Obtener facturas sin propietario (ownerId = null)
    public List<Invoice> getAllInvoicesWithoutOwner() {
        return invoiceRepository.findByOwnerIdIsNull();
    }

    // 🔹 Obtener facturas por ownerId
    public List<Invoice> getInvoicesByOwnerId(Integer ownerId) {
        return invoiceRepository.findByOwnerId(ownerId);
    }

    // 🔹 Buscar factura por ID
    public Optional<Invoice> findInvoiceById(Integer id) {
        return invoiceRepository.findById(id);
    }

    // 🔹 Crear o guardar factura
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    // 🔹 Editar factura existente
    public Invoice editInvoice(Integer id, Invoice updatedInvoice) {
        Optional<Invoice> existing = invoiceRepository.findById(id);
        if (existing.isPresent()) {
            Invoice invoice = existing.get();
            invoice.setOwnerId(updatedInvoice.getOwnerId());
            invoice.setLotId(updatedInvoice.getLotId());
            invoice.setUserName(updatedInvoice.getUserName());
            invoice.setDate(updatedInvoice.getDate());
            invoice.setAmount(updatedInvoice.getAmount());
            return invoiceRepository.save(invoice);
        }
        return null;
    }

    // 🔹 Eliminar factura
    public void deleteInvoice(Integer id) {
        invoiceRepository.deleteById(id);
    }
}
