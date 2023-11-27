import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerusers: any = [];
  registerObj:any = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private service: AuthService, private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
  }

  register(){
    const {name, email, password} = this.registerObj;

    if(name == ""){
      this.toastr.warning("Name is required");
      return;
    } else if(email == ""){
      this.toastr.warning("Email is required");
      return;
    } else if(password == "") {
      this.toastr.warning("Password is required");
      return;
    } 
    this.spinner.show();
    this.service.registerUser(this.registerObj).subscribe({
      next: (data) => {
        this.spinner.hide();
        this.toastr.success('Registered successfully');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Invalid user");
        this.spinner.hide();
      }
    })

  }

}