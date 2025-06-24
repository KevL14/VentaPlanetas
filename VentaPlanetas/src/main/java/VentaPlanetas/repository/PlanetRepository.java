package VentaPlanetas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import VentaPlanetas.model.Planet;

@Repository
public interface PlanetRepository extends JpaRepository<Planet, Integer>{
       Optional<Planet> findByName(String name);
}

