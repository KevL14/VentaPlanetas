package VentaPlanetas.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


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
    
    @PostMapping
    public ResponseEntity<?> addLot(@Validated @RequestBody Lot lot, BindingResult result){

        if(result.hasErrors()){
            Map<String,String> errores = new HashMap<>() ;
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<Lot> lotOp = lotService.findLotById(lot.getId());
        if (lotOp.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Esta Factura ya esta registrada");
        }
        Lot saveLot = lotService.addLot(lot);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(saveLot);
    }

    @GetMapping
    public ResponseEntity<?> getAllLots(){
        return ResponseEntity.ok(lotService.getAllLots());
    }

         @PutMapping("edit/{id}")
    public ResponseEntity<?> editLot(@Validated @PathVariable Integer id, @RequestBody Lot lot, BindingResult result){
        if(result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<Lot> lotFind=this.lotService.findLotById(id);
        if(!lotFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El lote con el id "+id+" no se encuentra registrado");
        }
        return ResponseEntity.ok(this.lotService.editLot(id,lot));
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteLot(Integer id){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Lote Eliminado Correctamente");
    }
}
