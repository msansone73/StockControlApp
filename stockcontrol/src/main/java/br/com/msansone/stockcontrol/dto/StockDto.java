package br.com.msansone.stockcontrol.dto;

import br.com.msansone.stockcontrol.model.enums.StockTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StockDto(
        @NotBlank(message = "{error.stockTickMandatary}")
        @Size(min = 5, max = 7, message = "{error.stockTickInalid}")
        String tick,
        @NotBlank(message = "{error.stockTickTypeMandatory}")
        StockTypeEnum stockType,
        @NotBlank(message = "{error.stockCompanyMandatory}")
        String company,
        String description
)
{ }
