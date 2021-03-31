import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  constructor(
    private colorService: ColorService,
    private activatedRouted: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  colorUpdateForm: FormGroup;
  currentColor:Color;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      if(params["colorId"])
      {
        this.getColorById(params["colorId"])
        this.createColorUpdateForm();
      }
    })
    
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required]
    });
  }

  getColorById(colorId: number) {
    this.colorService.getByIdColor(colorId).subscribe((response) => {
      if (response.success) {
        this.currentColor = response.data;
        this.colorUpdateForm.get('id')?.setValue(this.currentColor.id);
        this.colorUpdateForm.get('name')?.setValue(this.currentColor.name);        
      }
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/renkler']);
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
