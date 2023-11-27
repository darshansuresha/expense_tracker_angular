import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {
  id: any;
  name: any = "";
  expenseData: any = [];
  categoryData: any = [];
  categoryid: any = 0;
  tempexpensedata: any = [];
  total: any = 0;
  temptotal: any = 0;

  constructor(private router: Router, private service: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    this.id = sessionStorage.getItem('userid');
    this.getAllExpenses();
    this.getCategoryList();
  }

  getAllExpenses() {
    const self = this;
    this.spinner.show();
    this.service.getAllExpenses().subscribe({
      next: (res: any) => {
        res.map( function(val: any){
          if(val.userid == sessionStorage.getItem('userid')){
            self.total += val.cost;
            self.temptotal += val.cost;
            self.expenseData.push(val);
            self.tempexpensedata.push(val);
            self.spinner.hide();
          }
        });
      },
      error: (err)=> {
        console.log(err);
        this.toastr.error("Failed to fetch data");
      }
    });
    
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

  deleteitem(id: number){
    if (confirm('Are you sure you want to delete this?')) {
      this.service.delete(id).subscribe((data) => {
        this.expenseData = this.expenseData.filter(s => s.id != id )
      });
    } else {
      return
    }
  }

  changeCategory() {
      const self = this;
      this.total=0;
      if(this.categoryid == 0){
        this.total = this.temptotal;
        return this.expenseData = this.tempexpensedata;
      } else {
       
        this.expenseData = this.tempexpensedata;
        this.expenseData = this.expenseData.filter((res: { categoryid: string;}) => {
          this.total=0;
          this.expenseData.map( function(val: any){
            if(self.categoryid == val.categoryid){
              self.total += val.cost;
            }
          });
          return res.categoryid.toLocaleLowerCase().match(this.categoryid.toLocaleLowerCase());

        });
    }
  }

  key: string = 'id';
  reverse: any = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


}
