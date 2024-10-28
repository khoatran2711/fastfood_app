import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin';
  registerForm: FormGroup;
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastCtrl: ToastController,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  change(event) {
    this.screen = event;
  }

  login() {
    const formData: any = new FormData();
    // this.isLoading = true;
    // formData.append('email', this.formData.get('email').value);
    // formData.append('password', this.formData.get('password').value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.isLoading = true;
      formData.append('phoneNumber', this.loginForm.get('phoneNumber').value);
      formData.append('password', this.loginForm.get('password').value);
      this.apiService.login(formData).subscribe({
        next: async (data: any) => {
          const toast = await this.toastCtrl.create({
            message: 'Đăng nhập thành công',
            mode: 'ios',
            duration: 1000,
            position: 'top',
          });
          this.userService.saveUser(data.data);
          toast.present();
          this.router.navigate(['/home']);
        },
        error: async (error: any) => {
          const toast = await this.toastCtrl.create({
            message: error.error.message,
            mode: 'ios',
            duration: 1000,
            position: 'top',
          });
          toast.present();
        },
      });
    }
  }

  register() {
    const formData: any = new FormData();
    if (this.registerForm.valid) {
      this.isLoading = true;
      formData.append('fullName', this.registerForm.get('fullName').value);
      formData.append('phoneNumber', this.registerForm.get('phoneNumber').value);
      formData.append('password', this.registerForm.get('password').value);
      console.log(this.registerForm);
      this.apiService.register(this.registerForm.value).subscribe({
        next: async (data: any) => {
          const toast = await this.toastCtrl.create({
            message: 'Đăng Kys thành công',
            mode: 'ios',
            duration: 1000,
            position: 'top',
          });
          this.change('signin');
          toast.present();
        },
        error: async (error: any) => {
          const toast = await this.toastCtrl.create({
            message: error.error.message,
            mode: 'ios',
            duration: 1000,
            position: 'top',
          });
          toast.present();
        },
      });
    }
  }
}
