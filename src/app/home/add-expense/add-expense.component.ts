import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  categoryData: any = [];

  expenseObj: any = {
    userid: sessionStorage.getItem('userid'),
    categoryid: 0,
    cost: "",
    date:"",
    description:""
  };

  constructor(private router: Router, public toastr: ToastrService, private service: AuthService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(){
    this.service.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData = res;
      },
      error: (err)=> {
        console.log(err);
        this.toastr.error("Failed to fetch data");
      }
    });
  }

  addexpense() {
    const {categoryid, cost, date} = this.expenseObj;
    if(categoryid == null || categoryid == 0){
      this.toastr.warning("Select the category");
      return;
    } else if(cost == "") {
      this.toastr.warning("cost is required");
      return;
    } else if(date == "") {
      this.toastr.warning("date is required");
      return;
    }
    this.spinner.show();
    this.service.addExpense(this.expenseObj).subscribe({
      next: (res) => {
        this.toastr.success("Expense added successfully");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error("Failed to add expense data");
        console.log(err);
        this.spinner.hide();
      }
    })
  }
}
