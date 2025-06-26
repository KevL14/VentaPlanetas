package VentaPlanetas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import VentaPlanetas.model.Lot;
@Repository
public interface LotRepository extends JpaRepository<Lot,Integer>{
}
