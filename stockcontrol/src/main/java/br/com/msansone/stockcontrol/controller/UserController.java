package br.com.msansone.stockcontrol.controller;

import br.com.msansone.stockcontrol.Service.UserService;
import br.com.msansone.stockcontrol.dto.UserRequestDto;
import br.com.msansone.stockcontrol.exceptions.InvalidFormatExcption;
import br.com.msansone.stockcontrol.exceptions.UserNotFoundException;
import br.com.msansone.stockcontrol.model.User;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        List<User> users=userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id){
        User user = userService.getById(id);
            return ResponseEntity.ok(user);    }

    @ExceptionHandler(InvalidFormatExcption.class)
    @PostMapping
    public ResponseEntity<User> insert(@Valid @RequestBody UserRequestDto userDto){
        User user = userDto.toUser();
        if (user.getRole() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.insert(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user){
        if (user.getRole() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.update(id,user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        User user = userService.getById(id);
        if( user==null){
            return ResponseEntity.notFound().build();
        }
        userService.delete(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }
        user = userService.login(email, password);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(user);
    }

}

