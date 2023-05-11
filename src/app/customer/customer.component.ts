import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  success: boolean = false;
  errors!: String[];

  constructor(private service: CustomerService) { }


  ngOnInit(): void {

  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }


  saveCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/YYYY');

    this.service.save(this.customer).subscribe({
      next: response => {
        this.success = true;
        this.errors = [];
      }, error: ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.success = false;
            this.errors = ex.error.errors;
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
        }
      }
    })
  }
}