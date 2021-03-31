import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  constructor(private brandervice: BrandService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) { }

    brandAddForm: FormGroup;

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let colorModel = Object.assign({}, this.brandAddForm.value);
      this.brandervice.add(colorModel).subscribe(
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
