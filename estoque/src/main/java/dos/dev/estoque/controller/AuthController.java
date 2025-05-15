package dos.dev.estoque.controller;

import dos.dev.estoque.dto.LoginDTO;
import dos.dev.estoque.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginDTO loginDTO){
        boolean isValid = userService.validateLogin(loginDTO.email(), loginDTO.password());
        if(isValid){
            return ResponseEntity.ok("Login bem sucedido!");
        } else {
            return ResponseEntity.status(401).body("Credenciais invalidas!");
        }
    }
}
