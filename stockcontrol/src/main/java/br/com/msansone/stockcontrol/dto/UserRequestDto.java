package br.com.msansone.stockcontrol.dto;

import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.model.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record UserRequestDto(
    
    @NotBlank(message = "{error.invalidName}")
    @Size(min = 3, max = 100, message = "{error.invalidNameSize}")
    String name,
    
    @NotBlank(message = "{error.invalidEmail}")
    @Email(message = "{error.invalidEmailFormat}")
    String email,
    
    @NotBlank(message = "{error.invalidPassword}")
    @Size(min = 5, message = "{error.invalidPasswordSize}")
    // Você pode usar regex para senhas mais fortes, por exemplo:
    // @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$", 
    //          message = "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.")
    String password,
    
    @NotNull(message = "{error.invalidRole}")
    Role role
) {
    // Corpo do record fica vazio
    public User toUser() {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        return user;
    }
}