package br.com.msansone.stockcontrol.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @ManyToOne(cascade = CascadeType.ALL,fetch =FetchType.LAZY)
    private User user;
    @NotBlank
    @OneToOne
    private Stock stock;
    @NotBlank
    private LocalDate transactionDate;
    @NotBlank
    private BigDecimal unitaryValue;
    @NotBlank
    private Long quantity;

}
