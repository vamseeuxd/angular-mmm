import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import moment = require('moment');
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-month-select',
  templateUrl: './month-select.component.html',
  styleUrls: ['./month-select.component.css'],
})
export class MonthSelectComponent implements OnInit {
  datePickerValue: Date = new Date();
  dateRangePickerValue?: (Date | undefined)[];
  range1: Date = new Date();
  range2: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  @Output() selectedMonth: EventEmitter<string> = new EventEmitter();
  bsConfig?: Partial<BsDatepickerConfig>;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor() {}

  ngOnInit() {
    this.dateRangePickerValue = [this.range1, this.range2];
    this.bsConfig = Object.assign(
      {},
      {
        dateInputFormat: 'MMMM-YYYY',
        minMode: this.minMode,
        showTodayButton: true,
        containerClass: 'theme-dark-blue',
        todayPosition: 'center',
      }
    );
  }

  onDateChange($event) {
    this.selectedMonth.emit(moment($event).format('MMM-yyyy'));
  }

  nextMonth() {
    const d = moment(this.datePickerValue);
    d.add(1, 'M');
    this.datePickerValue = d.toDate();
    console.log(d.toDate());
  }

  previousMonth() {
    const d = moment(this.datePickerValue);
    d.subtract(1, 'M');
    this.datePickerValue = d.toDate();
    console.log(d.toDate());
  }
}
