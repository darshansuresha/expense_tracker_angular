import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  categoryData: any = [];
  response: any;

  @ViewChild(ExpenseListComponent) viewdata !: ExpenseListComponent;

  constructor(private service: AuthService, public toastr:ToastrService, private spinner: NgxSpinnerService) {}

  expenseObj: any = {
    userid: sessionStorage.getItem('userid'),
    id:null,
    categoryid: 0,
    cost: "",
    date:"",
    description:""
  };
  inputname="";
  ngOnInit(): void {  
    this.inputname="darshan";
    this.getCategoryList();
  }

  getCategoryList(){
    this.service.getAllCategories().subscribe({
      next: (res) => {
        this.categoryData = res;
      },
      error: (err)=> {
        this.toastr.error("Failed to fetch data");
      }
    });
  }

  addexpense(){
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
    if(this.expenseObj.id == null){
      this.response = this.viewdata.addExpenseList(this.expenseObj);
      this.spinner.hide();
      this.formreset();
    } else {
      this.response = this.viewdata.updateExpenseList(this.expenseObj);
      this.spinner.hide();
      this.formreset();
    }
   
  }

  formreset(){
    this.expenseObj={
      userid: sessionStorage.getItem('userid'),
      id:null,
      categoryid: 0,
      cost: "",
      date:"",
      description:""
    };
  }

  updateExpenseDataList( data: any){
    this.expenseObj=data;
  }

}
