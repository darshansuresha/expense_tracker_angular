import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginusers: any = [];
  loginObj:any = {
    email: '',
    password: ''
  }
  constructor(private toastr: ToastrService, private service: AuthService,
    private router: Router, private SpinnerService: NgxSpinnerService) {
      sessionStorage.clear();
  }

  login(){
    const {email, password} = this.loginObj;
     if(email == ""){
      this.toastr.warning("Email is required");
      return;
    } else if(password == "") {
      this.toastr.warning("Password is required");
      return;
    }
    
    const self = this;
    this.SpinnerService.show();
    this.service.getAllUsers().subscribe({
      next: (data) => {
        data.map(function(val: any){
          if(val.password == password && val.email == email){
            sessionStorage.setItem('name',val.name);
            sessionStorage.setItem('userid',val.id);
            self.SpinnerService.hide();
            self.toastr.success('Login is successfully');
            self.router.navigate(['home']);
          }
        });
      },
      error: (err) => {
        console.log(err);
        self.toastr.warning('Invalid crendentials');
        self.SpinnerService.hide();
      }
    });
    
  }

}
