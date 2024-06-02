import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = 'http://localhost:5212/api/customers';
  customerAdded = new Subject<void>();
  successMessage = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer).pipe(
      tap(() => this.customerAdded.next())
    );
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

   createNewCustomerList() {
    return this.http.get(this.apiUrl + 'createNewCustomerList');
   }
}
