package br.com.msansone.stockcontrol.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.msansone.stockcontrol.model.Stock;

public interface StockRepository extends JpaRepository<Stock, String> {

    Stock findByTick(String tick);
    
}
