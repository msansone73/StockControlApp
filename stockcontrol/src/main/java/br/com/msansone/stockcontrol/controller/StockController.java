package br.com.msansone.stockcontrol.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.msansone.stockcontrol.Service.StockService;
import br.com.msansone.stockcontrol.model.Stock;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "*")
public class StockController {
    @Autowired
    StockService stockService;

    @GetMapping
    public ResponseEntity<List<Stock>> getAll(){
        List<Stock> stocks=stockService.getAll();
        return ResponseEntity.ok(stocks);
    }

    @PostMapping
    public ResponseEntity<Stock> insert(@RequestBody Stock stock){
        return ResponseEntity.ok(stockService.insert(stock));
    }

    @GetMapping("/{tick}")
    public ResponseEntity<Stock> getById(@PathVariable String tick){
        Stock stock = stockService.getByTick(tick);
        return ResponseEntity.ok(stock);
    }
    
}
