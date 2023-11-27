import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './home/add-expense/add-expense.component';
import { EditExpenseComponent } from './home/edit-expense/edit-expense.component';
import { ExpenseDashboardComponent } from './home/expense-dashboard/expense-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path:"dashboard", component: DashboardComponent, pathMatch: 'full',canActivate:[AuthGuard] },
  {component: HomeComponent, path:"home", canActivate:[AuthGuard], 
    children: 
    [
      { path:"", component: ExpenseDashboardComponent, pathMatch: 'full' },
      { path:"add", component:AddExpenseComponent, pathMatch: 'full' },
      { path:"edit/:id", component:EditExpenseComponent, pathMatch: 'full' }
    ]
  },
  {component: RegisterComponent, path: "register", pathMatch: 'full'},
  {component: LoginComponent, path: "login", pathMatch: 'full'},
  {redirectTo: "login", path: "", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
