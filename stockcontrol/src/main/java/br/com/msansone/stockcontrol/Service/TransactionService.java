package br.com.msansone.stockcontrol.Service;

import java.util.List;

import br.com.msansone.stockcontrol.model.Transaction;

public interface TransactionService {

    List<Transaction> findAllByUserId(Long userId);

    Transaction insert(Transaction transaction);

    Transaction update(Long id, Transaction transaction);
    
}
