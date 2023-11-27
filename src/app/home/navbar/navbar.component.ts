import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: any= "";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }

  logout(){
    sessionStorage.clear();
    this.name="";
    this.router.navigate(['login']);
  }
}
