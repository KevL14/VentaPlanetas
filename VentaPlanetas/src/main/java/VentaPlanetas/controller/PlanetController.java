package VentaPlanetas.controller;

import VentaPlanetas.model.Planet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import VentaPlanetas.service.PlanetService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/planets")
@CrossOrigin(origins = "*")
public class PlanetController {     

    @Autowired
    private PlanetService planetService;

    @PostMapping
    public ResponseEntity<?> addPlanet(@Validated @RequestBody Planet planet, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<Planet> planetOp = this.planetService.findPlanetByName(planet.getName());
        if (planetOp.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El planeta con el nombre " + planet.getName() + " ya se encuentra registrado.");
        }
        Planet planetSave = this.planetService.addPlanet(planet);
        return ResponseEntity.status(HttpStatus.CREATED).body(planetSave);
    }

    @GetMapping
    public ResponseEntity<?> getAllPlanets() {
        List<Planet> listplanet = this.planetService.getAllPlanets();
        if (listplanet.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Planetas no registrados!");
        }
        return ResponseEntity.ok(listplanet);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> findPlanetById(@PathVariable Integer id) {
        Optional<Planet> planetFind = this.planetService.findPlanetById(id);
        if (!planetFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El planeta con el id " + id + " no se encuentra registrado");
        }
        return ResponseEntity.ok(planetFind);
    }

     @PutMapping("/{id}")
    public ResponseEntity<?> editplanet(@Validated @PathVariable Integer id, @RequestBody Planet planet, BindingResult result){
        if(result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<Planet> planetFind=this.planetService.findPlanetById(id);
        if(!planetFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El Planeta con el id "+id+" no se encuentra registrado");
        }
        return ResponseEntity.ok(this.planetService.editPlanet(id,planet));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteplanet(@PathVariable Integer id){
        Optional<Planet> planetFind=this.planetService.findPlanetById(id);
        if(!planetFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El Planeta con el id "+id+" no se encuentra registrado");
        }
        this.planetService.deletePlanet(id);
       return ResponseEntity.noContent().build();
    }


}
