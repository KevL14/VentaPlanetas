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
        return this.userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public Optional<User> findUserByName(String name) {
        return this.userRepository.findByName(name);
    }

    public User editUser(Integer id, User userEdit) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();

            existingUser.setName(userEdit.getName());
            existingUser.setEmail(userEdit.getEmail());
            existingUser.setPassword(userEdit.getPassword());
            existingUser.setage(userEdit.getage());
            existingUser.setAdmin(userEdit.getAdmin());

            return userRepository.save(existingUser); // ✅ se guarda el objeto ya existente
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
