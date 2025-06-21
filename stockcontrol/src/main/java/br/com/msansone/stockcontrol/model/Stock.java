package br.com.msansone.stockcontrol.model;

import br.com.msansone.stockcontrol.model.enums.StockTypeEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
public class Stock {
    @Id
    private String tick;
    @NotBlank
    private StockTypeEnum stockType;
    @NotBlank
    private String company;
    private String description;

}
