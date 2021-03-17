import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  path="https://localhost:44335/Uploads/CarImages/"
  carImages: CarImage[] = [];
  constructor(private carImageService: CarimageService,private activatedRouted: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["carId"])
      {
        this.getCarImages(params["carId"])
      }
    })  
  }

  getCarImages(carId:number) {
    this.carImageService.getCarImage(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

}
