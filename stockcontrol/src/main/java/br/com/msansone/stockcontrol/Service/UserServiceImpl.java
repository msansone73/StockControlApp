package br.com.msansone.stockcontrol.Service;

import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.model.enums.Role;
import br.com.msansone.stockcontrol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User update(Long id, User user) {
        User userCurrent = this.getById(id);
        userCurrent.setName(user.getName());
        userCurrent.setEmail(user.getEmail());
        if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
            userCurrent.setPassword(user.getPassword());
        }
        userCurrent.setRole(user.getRole());
        userCurrent.setActived(user.isActived());
        userRepository.save(userCurrent);
        return userCurrent;
    }

    @Override
    public User insert(User user) {
        user.setDtcreated(LocalDateTime.now());
        if (user.getRole() == null) {
            user.setRole(Role.USER); // Default to USER if not specified
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
