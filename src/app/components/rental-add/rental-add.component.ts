import { Component, Input, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FindeksService } from 'src/app/services/findeks.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe]
})
export class RentalAddComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  @Input() car: CarDetail[];
  customers: Customer[];
  customerId:number;    
  rentalAddForm: FormGroup;
  closeAddExpenseModal: any;
  minDate:string | null; 
  rentDate:string | null;
  rentEndDate:string | null;
  date:Date;
  totalPrice:number=0;
  totalDay:number=1;
  findeksLoad:boolean=true;
  findeksError:boolean=true;
  findeksMsg:string;
  
  constructor(private customerService: CustomerService,
              private findeksService: FindeksService,
              private formBuilder: FormBuilder,             
              private router: Router,
              private datePipe: DatePipe,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.dateApply();
    this.createProductAddForm();
    this.priceCalculator();
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;      
    });
  }

  createProductAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: [this.car[0].carId, Validators.required],
      rentDate: [this.minDate, Validators.required],
      rentEndDate: [this.minDate, Validators.required],
      customerId: ['', Validators.required],
      dailyPrice: [this.car[0].dailyPrice, Validators.required],
      totalPrice: [this.car[0].dailyPrice, Validators.required],
      totalDay: [1, Validators.required],
    });
  }


 
  
  dateApply()
  {   
    this.date = new Date();    
    this.rentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.rentEndDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.minDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;    
    this.rentDate=event.target.value;
  }

  customerChange(event: any) {
    this.findeksLoad=false;
    this.findeksService.query(this.car[0].carId,this.customerId).subscribe((response) => {
       if (response.success) {
        this.findeksLoad=true;
       }
       else{
         this.findeksMsg=response.message;
         this.findeksLoad=false;
         this.findeksError=false;
         this.toastr.error(response.message);
       } 
    });
  }

  rentEndChangeEvent(event: any) {
    this.rentEndDate = event.target.value;
    this.priceCalculator();
  }

  priceCalculator() {    


    if (this.rentDate != null && this.rentEndDate != null)
    {
      var date1 = new Date(this.rentEndDate);
      var date2 = new Date(this.rentDate);

      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalDay= numberOfDays+1;
      this.totalPrice = this.totalDay * this.car[0].dailyPrice;  
    }     
     
  }

    paymentRoute(){
      if (this.rentalAddForm.valid) {
      localStorage.setItem('payment-data',JSON.stringify(this.rentalAddForm.value));
      this.closeModal.nativeElement.click();
      this.toastr.warning("Ödeme sayfasına yönlendiriliyosunuz");
      this.router.navigate(['/odeme']);
      }
      else {
        this.toastr.error("Form Hatalı");
      }   
    }
  }