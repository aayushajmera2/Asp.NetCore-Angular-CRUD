import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/Customer.interface';
import { CustomerDto } from 'src/app/DTO/CustomerDTO';
import { CustomersService } from 'src/app/services/customers.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})

export class CustomerFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  isLoading = true;
  id: any;
  isAddCustomer: any;
  submitted = false;
  customerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    countryCode: ['', Validators.required],
    gender: ['', Validators.required],
    balance: [null, [Validators.required, this.numberValidator]],
    firstNameAscii: ['', Validators.required],
    lastNameAscii: ['', Validators.required],
    initials: ['', Validators.required],
    countryCodeAlpha: ['', Validators.required],
    countryName: ['', Validators.required],
    currency: ['', Validators.required],
    firstNameCountryFrequency: ['', Validators.required],
    firstNameCountryRank: ['', Validators.required],
    lastNameCountryFrequency: ['', Validators.required],
    lastNameCountryRank: ['', Validators.required],
    password: ['', Validators.required],
    primaryLanguage: ['', Validators.required],
    primaryLanguageCode: ['', Validators.required],
    salutation: ['', Validators.required]
  });
  isEdit: boolean = false;
  constructor(private route: ActivatedRoute, private customerService: CustomersService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isAddCustomer = this.id === 0;
    if (!isNaN(this.id) && this.id > 0) {
      this.isEdit = true;
      this.customerService.getCustomer(this.id).subscribe(customer => {
        this.isLoading = false;
        this.customerForm.setValue({
          firstName: customer.firstname || '',
          lastName: customer.lastname || '',
          email: customer.email || '',
          phoneNumber: customer.phone_Number || '',
          countryCode: customer.country_code || '',
          gender: customer.gender || '',
          balance: customer.balance || 0,
          firstNameAscii: customer.firstname_ascii || '',
          lastNameAscii: customer.lastname_ascii || '',
          initials: customer.initials || '',
          countryCodeAlpha: customer.country_code_alpha || '',
          countryName: customer.country_name || '',
          currency: customer.currency || '',
          firstNameCountryFrequency: customer.firstname_country_frequency || '',
          firstNameCountryRank: customer.firstname_country_rank || '',
          lastNameCountryFrequency: customer.lastname_country_frequency || '',
          lastNameCountryRank: customer.lastname_country_rank || '',
          password: customer.password || '',
          primaryLanguage: customer.primary_language || '',
          primaryLanguageCode: customer.primary_language_code || '',
          salutation: customer.salutation || '',
        });
      });
    }
    else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.isLoading = true;
      if (this.id === 0) {
        this.customerService.getCustomers().subscribe(customers => {
          const highestId = Math.max(...customers.map((customer: Customer) => customer.id));
          const uniqueId = highestId + 1;
          const customerDto = new CustomerDto(this.customerForm, uniqueId.toString());
          this.customerService.createCustomer(customerDto).subscribe((res) => {
            this.customerService.successMessage.next('added');
            this.isLoading = false;
            this.router.navigate(['/customer']);
          }, error => {
            console.error('Error creating customer:', error);
            this.isLoading = false;
          });
        });
      } else {
        this.isLoading = true;
        const customerDto = new CustomerDto(this.customerForm, this.id.toString());
        this.customerService.updateCustomer(this.id, customerDto).subscribe((res) => {
          this.customerService.successMessage.next('updated');
          this.isLoading = false;
          this.router.navigate(['/customer']);
        });
      }
    } else {
      Object.keys(this.customerForm.controls).forEach(field => {
        const control = this.customerForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') return null;
    return isNaN(value) ? { 'number': true } : null;
  }
}
