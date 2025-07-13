package br.com.msansone.stockcontrol.controller;

import java.util.List;
import java.util.stream.Collectors;

import br.com.msansone.stockcontrol.dto.StockDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<List<StockDto>> getAll(){
        List<Stock> stocks=stockService.getAll();
        List<StockDto> stockRequestDtos =
                stocks.
                stream().
                map(s -> new StockDto( s.getTick(),
                                                    s.getStockType(),
                                                    s.getCompany(),
                                                    s.getDescription())).
                collect(Collectors.toList());
        return ResponseEntity.ok(stockRequestDtos);
    }

    @PostMapping
    public ResponseEntity<Stock> insert(@RequestBody @Valid Stock stock){
        return ResponseEntity.ok(stockService.insert(stock));
    }

    @GetMapping("/{tick}")
    public ResponseEntity<Stock> getById(@PathVariable String tick){
        Stock stock = stockService.getByTick(tick);
        return ResponseEntity.ok(stock);
    }
    
    @PutMapping("/{tick}")
    public ResponseEntity<Stock> update(@PathVariable String tick, @RequestBody Stock stock){
        Stock stockActual = stockService.getByTick(tick);
        stockActual.setCompany(stock.getCompany());
        stockActual.setTick(stock.getTick());
        stockActual.setStockType(stock.getStockType());
        stockActual.setDescription(stock.getDescription());
        return ResponseEntity.ok(stockService.update(stockActual));
    }

    @DeleteMapping("/{tick}")
    public ResponseEntity delete(@PathVariable String tick){
        Stock stock = stockService.getByTick(tick);
        if( stock==null){
            return ResponseEntity.notFound().build();
        }
        stockService.delete(stock);
        return ResponseEntity.ok().build();
    }
}
