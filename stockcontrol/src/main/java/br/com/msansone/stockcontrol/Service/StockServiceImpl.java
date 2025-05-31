package br.com.msansone.stockcontrol.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.msansone.stockcontrol.model.Stock;
import br.com.msansone.stockcontrol.repository.StockRepository;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    StockRepository stockRepository;

    @Override
    public List<Stock> getAll() {
        return stockRepository.findAll();
    }

    @Override
    public Stock insert(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public Stock getByTick(String tick) {
        return stockRepository.findByTick(tick);
    }

    @Override
    public Stock update(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public void delete(Stock stock) {
        stockRepository.delete(stock);
    }


}
