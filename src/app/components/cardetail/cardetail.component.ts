import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  carDetails:Car[];
  carDetailsLoad=false;
  rentalControl = false;
  rentalMessage="";

  constructor(private carService: CarService,
              private rentalService: RentalService,
              private activatedRouted: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["carId"])
      {
        this.getCarsById(params["carId"])
        this.getCarRentalControl(params["carId"])
      }
    })   
  }

  getCarsById(carId:number) {
    this.carService.getCarGetById(carId).subscribe((response) => {
      this.carDetails = response.data;   
      this.carDetailsLoad=response.success;   
    });
  }

  getCarRentalControl(carId:number) {
    this.rentalService.getRentalCarControl(carId).subscribe((response) => { 
      this.rentalControl=response.success;
      this.rentalMessage=response.message; 
    });
  }

}
