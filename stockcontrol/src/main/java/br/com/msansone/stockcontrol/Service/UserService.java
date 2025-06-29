package br.com.msansone.stockcontrol.Service;

import br.com.msansone.stockcontrol.exceptions.UserNotFoundException;
import br.com.msansone.stockcontrol.model.User;
import java.util.List;

public interface UserService {
    List<User> getAll();
    User getById(Long id) throws UserNotFoundException;
    User update(Long id, User user) throws UserNotFoundException;
    User insert(User user);

    void delete(User user);
    User login(String email, String password);
}
