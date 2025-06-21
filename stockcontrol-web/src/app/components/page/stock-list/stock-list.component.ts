import { Component } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Stock } from '../../../models/Stock';

@Component({
  selector: 'app-stock-list',
  imports: [],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent {

    stocks: Stock[] = [];
    constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
    });
  }
}
