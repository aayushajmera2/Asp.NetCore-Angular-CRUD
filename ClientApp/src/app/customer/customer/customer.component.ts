import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  isLoading = true;
  customers: any[] = [];

  constructor(private customersService: CustomersService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getCustomers();
    this.customersService.successMessage.subscribe((message) => {
      if (message) {
        this.showSuccess(message);
      }
    })
  }

  getCustomers(): void {
    this.customersService.getCustomers().subscribe(customers => {
      this.isLoading = false;
      this.customers = customers.sort((a: any, b: any) => a.id - b.id);
    });
  }

  deleteCustomer(id: number): void {
    this.customersService.deleteCustomer(id).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.toastr.success('Customer has been deleted successfully!');
    });
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customer-form', id]);
  }

  addCustomer(): void {
    this.router.navigate(['/customer-form', 0]);
  }

  showSuccess(message: string) {
    if (message === 'added') {
      this.toastr.success('A new customer has been added successfully!');
    }
    else {
      this.toastr.success('Customer details has been updated successfully!');
    }
  }

  ngOnDestroy() {
    this.customersService.successMessage.next(null);
  }
}
