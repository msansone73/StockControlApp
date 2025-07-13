package br.com.msansone.stockcontrol.model;

import br.com.msansone.stockcontrol.model.enums.StockTypeEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    @Id
    private String tick;
    @NotNull
    private StockTypeEnum stockType;
    @NotBlank
    private String company;
    private String description;

}
