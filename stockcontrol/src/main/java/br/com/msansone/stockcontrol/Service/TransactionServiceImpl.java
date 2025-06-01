package br.com.msansone.stockcontrol.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.msansone.stockcontrol.model.Transaction;
import br.com.msansone.stockcontrol.model.User;
import br.com.msansone.stockcontrol.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Transaction> findAllByUserId(Long userId) {
        return transactionRepository.findAllByUserId(userId);
    }

    @Override
    public Transaction insert(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction update(Long id, Transaction transaction) {
        Transaction transactionActual = transactionRepository.findById(id).get();
        transactionActual.setStock(transaction.getStock());
        transactionActual.setTransactionDate(transaction.getTransactionDate());
        transactionActual.setUnitaryValue(transaction.getUnitaryValue());
        transactionActual.setQuantity(transaction.getQuantity());
        transactionActual.setTransactionType(transaction.getTransactionType());
        return transactionRepository.save(transactionActual);
    }
    
}
