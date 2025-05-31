package br.com.msansone.stockcontrol.model;

import br.com.msansone.stockcontrol.model.enums.StockTypeEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Stock {
    @Id
    private String tick;
    private StockTypeEnum stockType;
    private String company;
    private String description;

}
