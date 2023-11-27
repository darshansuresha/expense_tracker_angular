import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {  ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  categoryData: any = [];
  expenseData: any = [];

  message = "true";
  
  constructor(private router: Router, private service: AuthService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
  }
  
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

}


