import { Component, VERSION } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import breakupTransaction from './mmm-operators/breakup-transaction/breakup-transaction';
import {
  DateFrequency,
  ISettlement,
  ITransaction,
} from './interfaces/Transaction';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  selectedMonthAction: BehaviorSubject<string> = new BehaviorSubject('');
  settledTransactionAction: BehaviorSubject<ISettlement[]> =
    new BehaviorSubject([
      {
        id: '1651710557510',
        date: '03-May-2022',
        transactionId: '1651630290333',
      },
    ]);
  transactionsAction: BehaviorSubject<ITransaction[]> = new BehaviorSubject([
    {
      name: 'Test Income',
      amount: 10000,
      type: 'income',
      startDate: '2022-05-03',
      frequencyCount: 1,
      frequency: DateFrequency.MONTHS,
      noOfRepeats: 30,
      id: '1651630290333',
    },
    {
      name: 'Test Expense',
      amount: 1000,
      type: 'expenses',
      startDate: '2022-05-03',
      frequencyCount: 2,
      frequency: DateFrequency.DAYS,
      noOfRepeats: 4,
      id: '1651630290444',
    },
  ]);
  transactions$: Observable<ITransaction[]> =
    this.transactionsAction.asObservable();

  list = [];

  constructor() {
    combineLatest([
      this.selectedMonthAction.asObservable(),
      this.settledTransactionAction.asObservable(),
    ])
      .pipe(
        switchMap(([selectedMonth, settledTransaction]) => {
          return this.transactions$.pipe(
            breakupTransaction(selectedMonth, settledTransaction)
          );
        })
      )
      .subscribe((val) => {
        this.list = val;
      });
  }

  selectedMonth(value: string) {
    this.selectedMonthAction.next(value);
  }

  addTransaction(e: { data: ITransaction; isEdit: boolean }) {
    if (e.isEdit) {
      const result = this.transactionsAction.value.map((a) => {
        return a.id === e.data.id ? e.data : a;
      });
      this.transactionsAction.next([...result]);
    } else {
      e.data.id = new Date().getTime().toString();
      this.transactionsAction.next([...this.transactionsAction.value, e.data]);
    }
  }

  editTransaction(transactionId: string, manageTransaction: any) {
    const item = this.transactionsAction.value.find(
      (d) => d.id === transactionId
    );
    if (item) {
      manageTransaction.edit({ ...item });
    }
  }

  markAsPaid(transaction: ITransaction) {
    const item = this.settledTransactionAction.value.find(
      (d) =>
        d.transactionId === transaction.id &&
        d.date.toLowerCase() === transaction.dueDate.toLowerCase()
    );
    if (!item) {
      const isConfirm = confirm('Are you sure!Do you want to Mark as Settled');
      if (isConfirm) {
        const id = new Date().getTime().toString();
        const date = transaction.dueDate;
        const transactionId = transaction.id;
        const items = [
          { id, date, transactionId },
          ...this.settledTransactionAction.value,
        ];
        this.settledTransactionAction.next(items);
      }
    }
  }

  markAsNotPaid(transaction: ITransaction) {
    const item = this.settledTransactionAction.value.find(
      (d) => d.id === transaction.settlement.id
    );
    if (item) {
      const isConfirm = confirm(
        'Are you sure!Do you want to Mark as Not Settled'
      );
      if (isConfirm) {
        const items = this.settledTransactionAction.value.filter(
          (d) => d.id !== transaction.settlement.id
        );
        this.settledTransactionAction.next(items);
      }
    }
  }

  removeTransaction(transactionId: string) {
    const item = this.transactionsAction.value.find(
      (d) => d.id === transactionId
    );
    if (item) {
      const isConfirm = confirm(
        'Are you sure!Do you want to Delete Transaction?'
      );
      if (isConfirm) {
        const items = this.transactionsAction.value.filter(
          (d) => d.id !== transactionId
        );
        this.transactionsAction.next([...items]);
      }
    }
  }
}
