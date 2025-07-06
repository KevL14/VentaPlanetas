package VentaPlanetas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import VentaPlanetas.model.Lot;
@Repository
public interface LotRepository extends JpaRepository<Lot,Integer>{
        List<Lot> findByOwnerIdIsNull();
        
    List<Lot> findByCelestialPairTypeIgnoreCase(String celestialPairType);

    List<Lot> findByPriceBetween(Double min, Double max);
}
