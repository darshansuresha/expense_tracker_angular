import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit{

  categoryData: any = [];
  expenseObj: any = {
    userid: sessionStorage.getItem('userid'),
    categoryid: 0,
    cost: "",
    date:"",
    description:""
  };

  constructor(private router: Router, private service: AuthService, private route: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.getCategoryList();
    this.route.paramMap.subscribe((param)=> {
      let id= Number(param.get('id'));
      this.getById(id);
    });
  }

  getCategoryList(){
    this.service.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData = res;
        this.spinner.hide();
      },
      error: (err)=> {
        console.log(err);
        this.toastr.error("Failed to fetch data");
        this.spinner.hide();
      }
    });
  }

  getById(id: number) {
    this.service.edit(id).subscribe({
      next: (data) => {
        this.expenseObj=data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  update(){
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
    this.service.updateExpense(this.expenseObj).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toastr.success("Expense updated successfully");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error("Failed to update expense data");
        console.log(err);
        this.spinner.hide();
      }
    })
  }

}
