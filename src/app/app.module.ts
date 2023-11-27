import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AddExpenseComponent } from './home/add-expense/add-expense.component';
import { ExpenseDashboardComponent } from './home/expense-dashboard/expense-dashboard.component';
import { EditExpenseComponent } from './home/edit-expense/edit-expense.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SortByPipe } from './filtering';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseListComponent } from './dashboard/expense-list/expense-list.component';
import { NgxSpinnerModule } from "ngx-spinner"; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AddExpenseComponent,
    ExpenseDashboardComponent,
    EditExpenseComponent,
    NavbarComponent,
    SortByPipe,
    DashboardComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000, // 10 seconds
      progressBar: true,
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
