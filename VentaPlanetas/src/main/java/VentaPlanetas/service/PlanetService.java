package VentaPlanetas.service;

import VentaPlanetas.model.Planet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import VentaPlanetas.repository.PlanetRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service
public class PlanetService {
    @Autowired
    private PlanetRepository planetaRepository;

    public List<Planet> obtenerPlanetas() {
        return planetaRepository.obtenerDatosDesdeApi().stream().map(this::mapearAPlaneta).collect(Collectors.toList());

    }

    private Planet mapearAPlaneta(Map<String, Object> data) {
        Planet planet = new Planet();
        planet.setEnglishName((String) data.get("englishName"));
        planet.setGravity((Double) data.get("gravity"));
        planet.setSemimajorAxis(data.get("semimajorAxis") instanceof Number ? ((Number)data.get("semimajorAxis")).longValue() : null);
        planet.setSideralOrbit((Double) data.get("sideralOrbit"));
        planet.setSideralRotation((Double) data.get("sideralRotation"));

        // Rellenar mass, vol, atmosphere si están disponibles...
        // Aquí podrías mapear los anidados si quieres más completo.

        return planet;
    }
}
