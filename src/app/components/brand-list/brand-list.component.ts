import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: Brand[] = [];
  dataLoaded = false;
  filterText="";

  constructor(private brandService:BrandService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth();
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = response.success;
    });
  }

  isAuth(){
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken();
    }
  }

}
