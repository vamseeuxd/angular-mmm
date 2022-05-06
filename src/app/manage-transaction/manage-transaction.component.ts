import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  DateFrequency,
  DateFrequencyPlural,
  DateFrequencySignalr,
  ITransaction,
  getDetaultTransaction,
} from '../interfaces/Transaction';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css'],
})
export class ManageTransactionComponent implements OnInit {
  manageTransactionRef;
  radioModel = 'Middle';
  @ViewChild('transactionForm') transactionForm: NgForm;
  defaultValue: ITransaction = getDetaultTransaction();
  readonly DateFrequency = DateFrequency;
  isEdit = false;
  dateFrequency: { id: string; label: string }[] = [];
  @Output() addTransaction: EventEmitter<{
    data: ITransaction;
    isEdit: boolean;
  }> = new EventEmitter();
  constructor() {
    this.dateFrequency = Object.keys(DateFrequency).map((key) => {
      return {
        id: DateFrequency[key],
        label: key,
      };
    });
  }

  get isNever(): boolean {
    return this.transactionForm?.value?.frequency === DateFrequency.NEVER;
  }

  ngOnInit() {
    setTimeout(() => {
      const manageTransactionRef = document.getElementById('manageTransaction');
      // @ts-ignore
      this.manageTransactionRef = new bootstrap.Offcanvas(manageTransactionRef);
      // @ts-ignore
      // this.manageTransactionRef.show();
    }, 500);
  }
  edit(t: ITransaction) {
    this.isEdit = true;
    this.defaultValue = t;
    this.manageTransactionRef.show();
    this.transactionForm.resetForm(this.defaultValue);
  }
  close(showConfirm: boolean) {
    if (showConfirm && this.transactionForm.dirty) {
      const isConfirm = confirm('Are you sure! Do you want to Cancel?');
      if (isConfirm) {
        this.isEdit = false;
        this.transactionForm.resetForm(getDetaultTransaction());
        setTimeout(() => {
          this.manageTransactionRef.hide();
        }, 0);
      }
    } else {
      this.isEdit = false;
      this.transactionForm.resetForm(getDetaultTransaction());
      setTimeout(() => {
        this.manageTransactionRef.hide();
      }, 0);
    }
  }
  getLabel(val: string) {
    if (this.transactionForm?.value?.frequencyCount > 1) {
      return DateFrequencyPlural[val];
    } else {
      return DateFrequencySignalr[val];
    }
  }
}
