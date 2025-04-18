package br.com.msansone.stockcontrol.Service;

import br.com.msansone.stockcontrol.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {
    List<User> getAll();
    User getById(Long id);
    User update(Long id, User user);
    User insert(User user);

    void delete(User user);
    User login(String email, String password);
}
