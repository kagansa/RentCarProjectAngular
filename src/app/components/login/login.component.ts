import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  loginForm: FormGroup;
  isSuccess = false;

  ngOnInit(): void {
    this.createLoginForm();
    
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.valid) {
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.success(response.message);
        this.localStorageService.add("token", response.data.token);
        this.isSuccess = true;        
      }, responseError => {
        this.toastrService.error(responseError.error);
      })
    } else {
      if (this.loginForm.get('email')?.hasError('required') && this.loginForm.get('password')?.hasError('required')) {
        this.toastrService.error("Email ve şifre alanı boş olamaz.");
      } else if (this.loginForm.get('email')?.hasError('required')) {
        this.toastrService.error("Email alanı boş olamaz.");
      } else {
        this.toastrService.error("Şifre alanı boş olamaz.");
      }
    }
  }  
  
}
