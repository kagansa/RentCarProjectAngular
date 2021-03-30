import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  rentDate: string | null;
  rentEndDate: string | null;
  totalDay: string | null;
  dailyPrice: string | null;
  totalPrice: string | null;
  paymentAddForm: FormGroup;
  paymentSuccess: boolean = false;
  paymentError: boolean;
  paymentWait: boolean = false;

  ngOnInit(): void {
    this.rentalData();
    this.createPaymentAddForm();
  }

  rentalData() {
    if (localStorage.getItem('payment-data') === null) {
      this.router.navigate(['/araclar']);
    }
    var rentValue = JSON.parse(localStorage.getItem('payment-data') || '{}');
    this.rentDate = rentValue.rentDate;
    this.rentEndDate = rentValue.rentEndDate;
    this.totalDay = rentValue.totalDay;
    this.dailyPrice = rentValue.dailyPrice;
    this.totalPrice = rentValue.totalPrice;
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      number: ['', Validators.required],
      fullName: ['', Validators.required],
      ccv: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
    });
  }

  paymentAdd() {
    if (this.paymentAddForm.valid) {
      this.paymentWait = true;
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.add(paymentModel).subscribe(
        (response) => {
          this.paymentSuccess = response.success;
          this.paymentWait = false;
          if (this.paymentSuccess) {
            this.paymentError = false;
            this.toastr.success(response.message);
            this.addRental();
          } else {
            this.toastr.error(response.message);
            this.paymentError = true;            
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
            this.paymentError = true;
            this.paymentWait = false;
          }
        }
      );
    } else {
      this.toastr.error('Form Hatalı');
    }
  }

  addRental() {
    if (localStorage.getItem('payment-data') != null) {
      let rentalModel = Object.assign(
        {},
        JSON.parse(localStorage.getItem('payment-data') || '{}')
      );

      this.rentalService.add(rentalModel).subscribe(
        (response) => {
          this.toastr.success(response.message);
          localStorage.removeItem('payment-data');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    }
  }
}
