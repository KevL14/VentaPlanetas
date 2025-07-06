package VentaPlanetas.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import VentaPlanetas.model.Lot;
import VentaPlanetas.service.LotService;

@RestController
@RequestMapping("/api/Lot")
@CrossOrigin("*")
public class LotController {

    @Autowired
    LotService lotService;

    // Crear nuevo lote (POST)
@PostMapping
public ResponseEntity<?> addLot(@Validated @RequestBody Lot lot, BindingResult result) {
    if (result.hasErrors()) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError error : result.getFieldErrors()) {
            errores.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errores);
    }

    try {
        Lot saveLot = lotService.addLot(lot);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveLot);
    } catch (Exception e) {
        // Loguea el error para consola y devuelve mensaje legible
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno al guardar lote: " + e.getMessage());
    }
}

// 🔹 Obtener un lote por ID
@GetMapping("/{id}")
public ResponseEntity<?> getLotById(@PathVariable Integer id) {
    Optional<Lot> lot = lotService.findLotById(id);
    if (!lot.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("El lote con el id " + id + " no se encuentra registrado");
    }
    return ResponseEntity.ok(lot.get());
}

@GetMapping("/no-owner")
public ResponseEntity<List<Lot>> getLotsWithoutOwner() {
    List<Lot> lots = lotService.findLotsWithoutOwner();
    return ResponseEntity.ok(lots);
}
    // Obtener todos los lotes (GET)
    @GetMapping
    public ResponseEntity<?> getAllLots() {
        return ResponseEntity.ok(lotService.getAllLots());
    }

    // Obtener lotes filtrados por celestialPairType (planet o moon)
@GetMapping("/type/{celestialPairType}")
public ResponseEntity<?> getLotsByType(@PathVariable String celestialPairType) {
    List<Lot> lots = lotService.findLotsByCelestialPairType(celestialPairType);
    return ResponseEntity.ok(lots);
}

// Obtener lotes en rango de precio
@GetMapping("/price-range")
public ResponseEntity<?> getLotsByPriceRange(@RequestParam Double min, @RequestParam Double max) {
    List<Lot> lots = lotService.findLotsByPriceRange(min, max);
    return ResponseEntity.ok(lots);
}


    // Editar lote existente (PUT)
    @PutMapping("edit/{id}")
    public ResponseEntity<?> editLot(
            @PathVariable Integer id,
            @Validated @RequestBody Lot lot,
            BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }

        Optional<Lot> lotFind = lotService.findLotById(id);
        if (!lotFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El lote con el ID " + id + " no se encuentra registrado.");
        }

        // Es recomendable sincronizar el id del path con el id del objeto recibido
        lot.setId(id);

        Lot updatedLot = lotService.editLot(id, lot);
        return ResponseEntity.ok(updatedLot);
    }

    // Eliminar lote (DELETE)
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteLot(@PathVariable Integer id) {
        Optional<Lot> lotFind = lotService.findLotById(id);
        if (!lotFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El lote con el ID " + id + " no existe.");
        }

        lotService.deleteLot(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("✅ Lote eliminado correctamente");
    }
}
