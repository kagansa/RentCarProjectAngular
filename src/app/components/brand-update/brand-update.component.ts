import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    private activatedRouted: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  brandUpdateForm: FormGroup;
  currentBrand:Brand;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["brandId"])
      {
        this.getBrandById(params["brandId"])
        this.createBrandUpdateForm();
      }
    })
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getByIdBrands(brandId).subscribe((response) => {
      if (response.success) {
        this.currentBrand = response.data;
        this.brandUpdateForm.get('id')?.setValue(this.currentBrand.id);
        this.brandUpdateForm.get('name')?.setValue(this.currentBrand.name);        
      }
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/markalar']);
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
