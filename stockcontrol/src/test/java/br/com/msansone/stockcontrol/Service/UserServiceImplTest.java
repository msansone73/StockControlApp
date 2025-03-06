package br.com.msansone.stockcontrol.Service;

import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User existingUser;
    private final Long USER_ID = 1L;
    private final String ORIGINAL_PASSWORD = "originalPassword";

    @BeforeEach
    void setUp() {
        existingUser = new User();
        existingUser.setId(USER_ID);
        existingUser.setName("Original Name");
        existingUser.setEmail("original@email.com");
        existingUser.setPassword(ORIGINAL_PASSWORD);
        existingUser.setActived(true);
        existingUser.setDtcreated(LocalDateTime.now());
    }

    @Test
    @DisplayName("Should preserve password when updating user with null password")
    void shouldPreservePasswordWhenUpdatingWithNullPassword() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updateData = new User();
        updateData.setName("Updated Name");
        updateData.setEmail("updated@email.com");
        updateData.setPassword(null); // No password provided
        updateData.setActived(true);

        // Act
        User updatedUser = userService.update(USER_ID, updateData);

        // Assert
        assertEquals("Updated Name", updatedUser.getName());
        assertEquals("updated@email.com", updatedUser.getEmail());
        assertEquals(ORIGINAL_PASSWORD, updatedUser.getPassword()); // Password should remain unchanged
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should preserve password when updating user with empty password")
    void shouldPreservePasswordWhenUpdatingWithEmptyPassword() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updateData = new User();
        updateData.setName("Updated Name");
        updateData.setEmail("updated@email.com");
        updateData.setPassword(""); // Empty password provided
        updateData.setActived(true);

        // Act
        User updatedUser = userService.update(USER_ID, updateData);

        // Assert
        assertEquals("Updated Name", updatedUser.getName());
        assertEquals("updated@email.com", updatedUser.getEmail());
        assertEquals(ORIGINAL_PASSWORD, updatedUser.getPassword()); // Password should remain unchanged
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should update password when provided")
    void shouldUpdatePasswordWhenProvided() {
        // Arrange
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        String newPassword = "newPassword";
        User updateData = new User();
        updateData.setName("Updated Name");
        updateData.setEmail("updated@email.com");
        updateData.setPassword(newPassword); // New password provided
        updateData.setActived(true);

        // Act
        User updatedUser = userService.update(USER_ID, updateData);

        // Assert
        assertEquals("Updated Name", updatedUser.getName());
        assertEquals("updated@email.com", updatedUser.getEmail());
        assertEquals(newPassword, updatedUser.getPassword()); // Password should be updated
        verify(userRepository, times(1)).save(any(User.class));
    }
} 