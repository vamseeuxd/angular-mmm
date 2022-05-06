import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.css'],
})
export class YearSelectComponent implements OnInit {
  years = [2022, 2023, 2024, 2025];
  constructor() {}

  ngOnInit() {}
}
