package br.com.msansone.stockcontrol.Service;

import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
        userCurrent.setActived(user.isActived());
        userRepository.save(userCurrent);
        return userCurrent;
    }

    @Override
    public User insert(User user) {
        user.setDtcreated(LocalDateTime.now());
        userRepository.save(user);
        return user;
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }
}
