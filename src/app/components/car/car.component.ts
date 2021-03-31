import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  filterText="";
  
  constructor(private carService: CarService,
              private activatedRouted: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["brandId"] && params["colorId"])
      {
        this.getCarsBrandAndColor(params["brandId"],params["colorId"])
      }
      else if(params["brandId"])
      {
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"])
      }     
      else{
        this.getCar();
      }
    })   
  }

  getCar() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });}

    getCarsBrandAndColor(brandId:number,colorId:number) {
      this.carService.getCarsBrandAndColor(brandId,colorId).subscribe((response) => {
        this.cars = response.data;
      });}
}
