import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from '../interfaces/Transaction';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  @Input() list: ITransaction[] = [];
  constructor() {}

  ngOnInit() {
    console.log(this.list.reduce(this.reducer, 0));
  }

  reducer(previousValue: any, currentValue: any) {
    return previousValue + currentValue.amount;
  }

  get incomeTotal(): number {
    return this.list.filter((d) => d.type === 'income').reduce(this.reducer, 0);
  }

  get incomeSettledTotal(): number {
    return this.list
      .filter((d) => d.type === 'income')
      .filter((d) => d.settlement)
      .reduce(this.reducer, 0);
  }

  get incomeNotSettledTotal(): number {
    return this.incomeTotal - this.incomeSettledTotal;
  }

  get expensesNotSettledTotal(): number {
    return this.expensesTotal - this.expensesSettledTotal;
  }

  get expensesTotal(): number {
    return this.list
      .filter((d) => d.type === 'expenses')
      .reduce(this.reducer, 0);
  }

  get expensesSettledTotal(): number {
    return this.list
      .filter((d) => d.type === 'expenses')
      .filter((d) => d.settlement)
      .reduce(this.reducer, 0);
  }
}
