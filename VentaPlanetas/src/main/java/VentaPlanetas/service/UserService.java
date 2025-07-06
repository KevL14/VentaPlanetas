package VentaPlanetas.service;

import VentaPlanetas.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VentaPlanetas.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequestMapping("/api/user")
public class UserService {
    @Autowired
    private UserRepository userRepository;

public User addUser(User user) {
    // Si credit es null seria 0
    if (user.getCredit() == null) {
        user.setCredit(0);
    }
    // Si tiene otro valor distinto de 0, se deja tal cual

    if (user.getAdmin() == null) {
        user.setAdmin(false);
    }

    return this.userRepository.save(user);
}

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public Optional<User> findUserByName(String name) {
        return this.userRepository.findByName(name);
    }
    public List<User> findUsersByName(String name) {
    return userRepository.findByNameContainingIgnoreCase(name);
}

public User editUser(Integer id, User userEdit) {
    Optional<User> userOptional = this.userRepository.findById(id);
    if (userOptional.isPresent()) {
        User existingUser = userOptional.get();

        existingUser.setName(userEdit.getName());
        existingUser.setEmail(userEdit.getEmail());
        existingUser.setPassword(userEdit.getPassword());
        existingUser.setage(userEdit.getage());
        existingUser.setCredit(userEdit.getCredit());  // <-- Esta línea es clave
        existingUser.setAdmin(userEdit.getAdmin());

        return userRepository.save(existingUser);
    }
    return new User();
}
    public void deleteUser(Integer id) {
        this.userRepository.deleteById(id);
    }

    public Optional<User> findUserById(Integer id) {
        return this.userRepository.findById(id);
    }

}
