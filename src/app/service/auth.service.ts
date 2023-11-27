import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  apiurl='http://localhost:3000/';

  registerUser(inputdata:any): Observable<any>{
    return this.http.post(this.apiurl + 'users', inputdata)
  }
 
  getAllUsers(): Observable<any>{
    return this.http.get(this.apiurl + 'users');
  }

  isloggedin(){
    return sessionStorage.getItem('name')!=null;
  }

  getAllCategories(): Observable<any>{
    return this.http.get(this.apiurl + "categories");
  }

  getAllExpenses(): Observable<any>{
    return this.http.get(this.apiurl + "expense_list");
  }

  addExpense(inputdata: any): Observable<any>{
    return this.http.post(this.apiurl + "expense_list", inputdata);
  }

  edit(id: number){
    return this.http.get(this.apiurl+`expense_list/${id}`);
  }

  delete(id: any): Observable<any>{
    return this.http.delete(this.apiurl+`expense_list/${id}`);
  }

  updateExpense(inputdata: any){
    return this.http.put(this.apiurl+`expense_list/${inputdata.id}`, inputdata);
  }

}