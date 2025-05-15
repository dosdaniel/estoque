package dos.dev.estoque.service;

import dos.dev.estoque.dto.CreateUserDto;
import dos.dev.estoque.dto.UpdateUserDto;
import dos.dev.estoque.entity.User;
import dos.dev.estoque.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean validateLogin(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()){
            return false;
        }
        User user = userOptional.get();
        return passwordEncoder.matches(password, user.getPassword());
    }

    public UUID createUser(CreateUserDto createUserDto) {

        String hashedPassword = passwordEncoder.encode(createUserDto.password());
        //DTO para ENTITY
        var entity = new User(
                UUID.randomUUID(),
                createUserDto.username(),
                createUserDto.email(),
                hashedPassword,
                Instant.now(),
                null);


        var userSaved = userRepository.save(entity);

        return userSaved.getUserId();
    }

    public Optional<User> getUserById(String userId){
        return userRepository.findById(UUID.fromString(userId));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUserById(String userId, UpdateUserDto updateUserDto) {
        //ENTITY PARA DTO
        var userExists = userRepository.findById(UUID.fromString(userId));

        if(userExists.isPresent()){
            var user = userExists.get();

            if(updateUserDto.username() != null){
                user.setUsername(updateUserDto.username());
            }
            if(updateUserDto.password() != null){
                user.setPassword(updateUserDto.password());
            }
            userRepository.save(user);
        }
    }

    public void deleteUserById(String userId){
        var userExists = userRepository.existsById(UUID.fromString(userId));
        if(userExists){
            userRepository.deleteById(UUID.fromString(userId));
        }
    }
}
