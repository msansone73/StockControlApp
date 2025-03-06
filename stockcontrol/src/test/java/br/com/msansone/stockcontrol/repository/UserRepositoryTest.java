package br.com.msansone.stockcontrol.repository;

import br.com.msansone.stockcontrol.Service.UserService;
import br.com.msansone.stockcontrol.model.User;
import jakarta.persistence.EntityManager;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @BeforeEach
    void setUp() {
        createUser();
    }

    @Test
    @DisplayName("Should find a client by Name")
    void findUserByName(){
        User userReturned = userRepository.findUserByName("Jose teste");
        assertTrue(userReturned.getEmail().equals("teste@email.com"));
    }

    @Test
    @DisplayName("Should´nt accept invalid email")
    void notAcceptInvalidEmailTest(){
        User user = new User();
        user.setName("Jose teste");
        user.setEmail("teste");
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertThat(violations).isNotEmpty(); // Garante que há erro de validação
        assertThat(violations.iterator().next().getMessage()).contains("must be a well-formed email address");
    }

    @Test
    @DisplayName("Should´nt accept two users with same email")
    void notAccepTwoUserWithSameEmailTest(){
        User user = new User();
        user.setName("Jose teste");
        user.setEmail("teste@email.com");
        user.setPassword("123");
        user.setActived(true);
        User newUser= userService.insert(user);
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertThat(violations).isNotEmpty(); // Garante que há erro de validação
        assertThat(violations.iterator().next().getMessage()).contains("must be a well-formed email address");
    }


    private User createUser(){
        User user = new User();
        user.setName("Jose teste");
        user.setEmail("teste@email.com");
        user.setPassword("123");
        user.setActived(true);
        this.entityManager.persist(user);
        return user;
    }
}


