package VentaPlanetas.repository;

import VentaPlanetas.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    List<Invoice> findByOwnerId(Integer ownerId);

    List<Invoice> findByOwnerIdIsNull();
}
