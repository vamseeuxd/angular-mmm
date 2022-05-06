import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MonthSelectComponent } from './month-select/month-select.component';
import { YearSelectComponent } from './year-select/year-select.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TransactionInputComponent } from './transaction-input/transaction-input.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RightSideMenuComponent } from './right-side-menu/right-side-menu.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgPipesModule } from 'ngx-pipes';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgPipesModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  declarations: [
    TransactionListComponent,
    TransactionInputComponent,
    StatisticsComponent,
    YearSelectComponent,
    MonthSelectComponent,
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    RightSideMenuComponent,
    ManageTransactionComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
