package VentaPlanetas.controller;

import VentaPlanetas.model.Invoice;
import VentaPlanetas.service.InvoiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

        // 🔹 Obtener una factura por ID
    @GetMapping("/{invoiceId}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Integer invoiceId) {
        Optional<Invoice> invoiceOpt = invoiceService.findInvoiceById(invoiceId);
        if (!invoiceOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La factura con ID " + invoiceId + " no fue encontrada.");
        }
        return ResponseEntity.ok(invoiceOpt.get());
    }


    // 🔹 Obtener todas las facturas
    @GetMapping
    public ResponseEntity<?> getAllInvoices() {
        List<Invoice> list = invoiceService.getAllInvoices();
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No hay facturas registradas.");
        }
        return ResponseEntity.ok(list);
    }

    // 🔹 Obtener todas las facturas sin propietario (ownerId = null)
    @GetMapping("/no-owner")
    public ResponseEntity<?> getAllInvoicesNotOwner() {
        List<Invoice> list = invoiceService.getAllInvoicesWithoutOwner();
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No hay facturas sin propietario.");
        }
        return ResponseEntity.ok(list);
    }

    // 🔹 Obtener facturas por ownerId
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> getAllInvoicesByOwnerId(@PathVariable Integer ownerId) {
        List<Invoice> list = invoiceService.getInvoicesByOwnerId(ownerId);
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron facturas para el propietario con ID " + ownerId);
        }
        return ResponseEntity.ok(list);
    }

    // 🔹 Crear una factura
    @PostMapping
    public ResponseEntity<?> createInvoice(@Validated @RequestBody Invoice invoice, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Invoice saved = invoiceService.createInvoice(invoice);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 🔹 Editar toda la factura
    @PutMapping("/{id}")
    public ResponseEntity<?> editInvoice(@PathVariable Integer id, @Validated @RequestBody Invoice invoice, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }

        Optional<Invoice> existing = invoiceService.findInvoiceById(id);
        if (!existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Factura con ID " + id + " no encontrada.");
        }

        Invoice updated = invoiceService.editInvoice(id, invoice);
        return ResponseEntity.ok(updated);
    }

    // 🔹 Editar solo el propietario (para asignar dueño en compra)
    @PutMapping("/{invoiceId}/assign-owner/{ownerId}")
    public ResponseEntity<?> assignOwner(@PathVariable Integer invoiceId, @PathVariable Integer ownerId) {
        Optional<Invoice> invoiceOpt = invoiceService.findInvoiceById(invoiceId);
        if (!invoiceOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Factura con ID " + invoiceId + " no encontrada.");
        }

        Invoice invoice = invoiceOpt.get();
        invoice.setOwnerId(ownerId);

        Invoice updated = invoiceService.createInvoice(invoice); // reutiliza el método de guardar
        return ResponseEntity.ok(updated);
    }

    // 🔹 Eliminar factura
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvoice(@PathVariable Integer id) {
        Optional<Invoice> invoiceOpt = invoiceService.findInvoiceById(id);
        if (!invoiceOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Factura con ID " + id + " no encontrada.");
        }

        invoiceService.deleteInvoice(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
