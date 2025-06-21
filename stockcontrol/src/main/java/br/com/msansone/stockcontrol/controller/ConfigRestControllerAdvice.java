package br.com.msansone.stockcontrol.controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.msansone.stockcontrol.exceptions.InvalidFormatExcption;

@RestControllerAdvice
public class ConfigRestControllerAdvice {

    @ExceptionHandler(InvalidFormatExcption.class)
    public ResponseEntity<String> handleInvalidFormat(
                                InvalidFormatExcption ex) {


        return ResponseEntity.badRequest().body(ex.getMessage());
    }
    
}
