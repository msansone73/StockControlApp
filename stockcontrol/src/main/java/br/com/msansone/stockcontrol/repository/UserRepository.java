package br.com.msansone.stockcontrol.repository;

import br.com.msansone.stockcontrol.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByName(String name);

    User findByEmail(String email);

}
