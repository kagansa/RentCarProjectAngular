import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { creditCard } from 'src/app/models/creditCard';
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
  customerId: number;
  creditCards: creditCard[] = [];
  creditCardId: number;
  cardNumber:string;

  @ViewChild('btnCardSave') cardSaveModal: ElementRef;
  @ViewChild('cardSaveModalClose') cardSaveModalClose: ElementRef;

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
    this.customerId = rentValue.customerId;
    this.getCards(this.customerId);
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      userId: [0, Validators.required],
      number: ['', Validators.required],
      fullName: ['', Validators.required],
      ccv: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
    });
  }

  getCards(customerId: number) {
    this.paymentService.getAllCustomerId(customerId).subscribe((response) => {
      if (response.success) {
        this.creditCards = response.data;
      }
    });
  }

  paymentAdd() {
    if (this.paymentAddForm.valid) {
      this.paymentAddForm.get('userId')?.setValue(this.customerId);
      this.paymentWait = true;
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.payment(paymentModel).subscribe(
        (response) => {
          this.paymentSuccess = response.success;
          this.paymentWait = false;
          if (this.paymentSuccess) {
            this.paymentError = false;
            this.toastr.success(response.message);
            this.addRental();
            console.log(this.creditCardId);
            if (this.cardExits() == false) {
              this.cardSaveModal.nativeElement.click();
            }            
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

  creditCardAdd() {
    if (this.paymentAddForm.valid) {
      let cardModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.add(cardModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastr.success(response.message);
            this.cardSaveModalClose.nativeElement.click();
          } else {
            this.toastr.error(response.message);
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

  cardChange(event: any) {
    let selectedCard = this.creditCards.find((c) => c.id == this.creditCardId);
    this.paymentAddForm.get('fullName')?.setValue(selectedCard?.fullName);
    this.paymentAddForm.get('number')?.setValue(selectedCard?.number);
    this.paymentAddForm
      .get('expirationMonth')
      ?.setValue(selectedCard?.expirationMonth);
    this.paymentAddForm
      .get('expirationYear')
      ?.setValue(selectedCard?.expirationYear);
    this.paymentAddForm.get('ccv')?.setValue(selectedCard?.ccv);
  }

  cardExits() {
    let card = this.creditCards.find((c) => c.number == this.cardNumber);
    if (card === undefined) {
      return false;
    }
    return true;
  }
}
