package br.com.msansone.stockcontrol.controller;

import br.com.msansone.stockcontrol.Service.UserService;
import br.com.msansone.stockcontrol.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
@CrossOrigin( origins = "*")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        List<User> users=userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id){
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> insert(@RequestBody User user){
        return ResponseEntity.ok(userService.insert(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user){
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
}

