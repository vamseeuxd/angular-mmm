import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ITransaction } from '../interfaces/Transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  @Input() list: ITransaction[] = [];
  @Output() edit: EventEmitter<string> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() markAsPaid: EventEmitter<ITransaction> = new EventEmitter();
  @Output() markAsNotPaid: EventEmitter<ITransaction> = new EventEmitter();
  @Output() clone: EventEmitter<ITransaction> = new EventEmitter();
  @ViewChild('listView') listView: ElementRef;
  windowHeight = window.innerHeight;
  listViewHeight = window.innerHeight;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = window.innerHeight;
    this.listViewHeight = this.listView.nativeElement.clientHeight;
  }
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.listViewHeight = this.listView.nativeElement.clientHeight;
    }, 500);
  }

  // window.innerHeight
}
