package br.com.msansone.stockcontrol.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.msansone.stockcontrol.Service.TransactionService;
import br.com.msansone.stockcontrol.model.Transaction;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
    
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getAllByUser(@PathVariable Long userId){
        List<Transaction> transactions=transactionService.findAllByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity<Transaction> insert(@RequestBody Transaction transaction){
        return ResponseEntity.ok(transactionService.insert(transaction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @RequestBody Transaction transaction){
        return ResponseEntity.ok(transactionService.update(id, transaction));
    }
}
