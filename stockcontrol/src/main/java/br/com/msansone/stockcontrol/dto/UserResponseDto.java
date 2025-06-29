package br.com.msansone.stockcontrol.dto;

import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.model.enums.Role;

public record UserResponseDto (
    String name,
    String email,
    Role role
){
    public UserResponseDto(User user){
        this(user.getName(), 
            user.getEmail(), 
            user.getRole());
    }
}
