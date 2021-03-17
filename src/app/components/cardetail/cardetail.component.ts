import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cars: Car[] = [];
  constructor(private carService: CarService,private activatedRouted: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["carId"])
      {
        this.getCarsById(params["carId"])
      }
    })   
  }

  getCarsById(carId:number) {
    this.carService.getCarGetById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

}
