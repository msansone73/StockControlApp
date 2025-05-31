package br.com.msansone.stockcontrol.Service;

import java.util.List;


import br.com.msansone.stockcontrol.model.Stock;

public interface StockService {

    List<Stock> getAll();

    Stock insert(Stock stock);
    
}
