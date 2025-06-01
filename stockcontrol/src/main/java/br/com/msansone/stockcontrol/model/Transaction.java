package br.com.msansone.stockcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import br.com.msansone.stockcontrol.model.enums.TransactionType;

@Data
@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.DETACH,fetch =FetchType.EAGER)
    private User user;
    @ManyToOne(cascade = CascadeType.DETACH,fetch =FetchType.EAGER)
    private Stock stock;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate transactionDate;
    @NotNull
    private BigDecimal unitaryValue;
    @NotNull
    private Long quantity;
    @NotNull
    private TransactionType transactionType;

}
