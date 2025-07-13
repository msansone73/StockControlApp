package br.com.msansone.stockcontrol.mapper;

import br.com.msansone.stockcontrol.dto.StockDto;
import br.com.msansone.stockcontrol.model.Stock;

public class StockMapper {

    public static StockDto toStockDto(Stock stock){
        return  new StockDto(
                stock.getTick(),
                stock.getStockType(),
                stock.getCompany(),
                stock.getDescription()
        );
    }

    public static Stock toStock(StockDto stockRequestDto){
        return new Stock(
                stockRequestDto.tick(),
                stockRequestDto.stockType(),
                stockRequestDto.company(),
                stockRequestDto.description()
        );
    }
}
