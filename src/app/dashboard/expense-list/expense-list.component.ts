import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

 
  @Input() categoryData: any;

  @Output() dataupdatevent = new EventEmitter<any>();

  expenseData: any = [];
  tempexpensedata: any = [];
  total: any = 0;
  temptotal: any = 0;
  categoryid: any = 0;

  constructor(private service: AuthService, public toastr: ToastrService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    const self = this;
    this.spinner.show();
    this.service.getAllExpenses().subscribe({
      next: (res: any) => {
        this.spinner.hide();
        res.map( function(val: any){
          if(val.userid == sessionStorage.getItem('userid')){
            self.total += val.cost;
            self.temptotal += val.cost;
            self.expenseData.push(val);
            self.tempexpensedata.push(val);
          }
        });
      },
      error: (err)=> {
        console.log(err);
        this.toastr.error("Failed to fetch data");
        this.spinner.hide();
      }
    });
    
  }

  addExpenseList(obj:any){
    this.service.addExpense(obj).subscribe({
      next: (res: any) => {
        // this.expenseData.push(obj);
        this.getAllExpenses();
        this.toastr.success("Expense added successfully");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Failed to add expense data");
        return;
      }
    });
  }

  updateExpenseList(obj: any){
    this.service.updateExpense(obj).subscribe({
      next: (res: any) => {
        // var b = this.expenseData.find(e => e.id == obj.id);
        // b.categoryid = obj.categoryid;
        // b.cost = obj.cost;
        // b.date= obj.date;
        // b.description=obj.description;
        this.getAllExpenses();
        this.toastr.success("Expense updated successfully");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Failed to update expense data");
        return;
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

  editExpenseList(data: any){
    console.log(data);
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
