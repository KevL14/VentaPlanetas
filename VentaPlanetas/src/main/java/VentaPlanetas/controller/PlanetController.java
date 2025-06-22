package VentaPlanetas.controller;
import VentaPlanetas.model.Planet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import VentaPlanetas.service.PlanetService;

import java.util.List;
@RestController
@RequestMapping("/api/planets")
@CrossOrigin(origins = "*")
public class PlanetController {

    @Autowired
    private PlanetService planetaService;

    public PlanetController() {
        System.out.println("🟢 PlanetController cargado correctamente");
    }

    @GetMapping
    public List<Planet> obtenerPlanetas() {
        return planetaService.obtenerPlanetas();
    }
}

