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
        Optional<User> userOp = this.userService.findUserByName(user.getName());
        if (userOp.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario con el nombre " + user.getName() + " ya se encuentra registrado.");
        }
        User userSave = this.userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userSave);
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> listUser = this.userService.getAllUsers();
        if (listUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuarios no registrados!");
        }
        return ResponseEntity.ok(listUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findUserById(@PathVariable Integer id) {
        Optional<User> userFind = this.userService.findUserById(id);
        if (!userFind.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario con el id " + id + " no se encuentra registrado");
        }
        return ResponseEntity.ok(userFind);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editUser(@Validated @PathVariable Integer id, @RequestBody User user, BindingResult result){
        if(result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errores);
        }
        Optional<User> userFind=this.userService.findUserById(id);
        if(!userFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario con el id "+id+" no se encuentra registrado");
        }
        return ResponseEntity.ok(this.userService.editUser(id,user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        Optional<User> userFind=this.userService.findUserById(id);
        if(!userFind.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario con el id "+id+" no se encuentra registrado");
        }
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
