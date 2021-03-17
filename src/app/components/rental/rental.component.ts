import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: Rental[]=[];

  constructor(private colorService:RentalService) { }

  ngOnInit(): void {
    this.getRental();
  }

  getRental(){
    this.colorService.getRentalDetails().subscribe((response) => { this.rentals = response.data; });
  }

}
