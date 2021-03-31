import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  constructor(private brandService: BrandService,
              private colorService: ColorService,
              private carService: CarService,
              private formBuilder: FormBuilder,
              private activatedRouted: ActivatedRoute,
              private toastrService:ToastrService,
              private router: Router) { }

  
  carUpdateForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  brandId:number;
  colorId:number;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["carId"])
      {
        this.getCar(params["carId"])
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    })
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      description: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      modelYear: ["", Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;  
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;      
    });
  }

  getCar(carId:number) {
    this.carService.getCarById(carId).subscribe((response) => {
      
      
      this.carUpdateForm.get('id')?.setValue(response.data.id);
      this.carUpdateForm.get('brandId')?.setValue(response.data.brandId);
      this.carUpdateForm.get('colorId')?.setValue(response.data.colorId); 
      this.carUpdateForm.get('description')?.setValue(response.data.description);
      this.carUpdateForm.get('dailyPrice')?.setValue(response.data.dailyPrice); 
      this.carUpdateForm.get('modelYear')?.setValue(response.data.modelYear);          
    });
  }
  
  update()
  {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/araclar']);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
    
  }


}
