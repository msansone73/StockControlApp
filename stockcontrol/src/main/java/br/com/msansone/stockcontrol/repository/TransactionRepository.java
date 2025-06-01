package br.com.msansone.stockcontrol.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.msansone.stockcontrol.model.Transaction;
import br.com.msansone.stockcontrol.model.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByUser(User user);

    List<Transaction> findAllByUserId(Long userId);
    
}
