package VentaPlanetas.controller;

import VentaPlanetas.model.User;
import VentaPlanetas.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> addUser(@Validated @RequestBody User user, BindingResult result){
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        try {
            Optional<User> userOp = this.userService.findUserByName(user.getName());
            if (userOp.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario con el nombre " + user.getName() + " ya se encuentra registrado.");
            }
            User userSave = this.userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userSave);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno al guardar usuario: " + e.getMessage());
        }
    }

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> listUser = this.userService.getAllUsers();
        if (listUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuarios no registrados!");
        }
        return ResponseEntity.ok(listUser);
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id) {
        Optional<User> userFind = this.userService.findUserById(id);
        if (!userFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario con el id " + id + " no se encuentra registrado");
        }
        return ResponseEntity.ok(userFind.get()); // <- enviamos el objeto User directamente
    }

    // Buscar usuarios por nombre (parcial o completo)
    @GetMapping("/search")
    public ResponseEntity<?> findUsersByName(@RequestParam("name") String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El parámetro 'name' es obligatorio");
        }
        List<User> users = userService.findUsersByName(name.trim());
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No se encontraron usuarios");
        }
        return ResponseEntity.ok(users);
    }

    // Editar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@Validated @PathVariable Integer id, @RequestBody User user, BindingResult result){
        if(result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<User> userFind = this.userService.findUserById(id);
        if(!userFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario con el id "+id+" no se encuentra registrado");
        }
        User updatedUser = this.userService.editUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        Optional<User> userFind = this.userService.findUserById(id);
        if(!userFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario con el id "+id+" no se encuentra registrado");
        }
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
