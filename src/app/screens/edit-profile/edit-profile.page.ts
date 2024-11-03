import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  profile = {
    name: '',
    email: '',
    imageUrl: '',
  };
  screen = 'info';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private apiService: ApiService,
    private toastCtrl: ToastController
  ) {
    this.makeInfoForm();
  }


  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  ionViewWillEnter() {
    this.screen = 'info';
    this.fetchUser();
  }
  ngOnInit(): void {
    this.fetchUser();
  }
  change(event) {
    this.screen = event;
  }
  // Handle image upload
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Save profile changes
  saveProfile() {
    // Perform save operation here, such as sending data to a backend
    console.log('Profile saved:', this.profile);
    // Add navigation or success message if needed
  }
  makeInfoForm(d?) {
    this.profileForm = this.fb.group({
      phoneNumber: [d?.phoneNumber, [Validators.required]],
      address: [d?.address, [Validators.required]],
      fullName: [d?.fullName, [Validators.required]],
    });
  }
  makePasswordForm(d?) {
    this.passwordForm = this.fb.group({
      phoneNumber: [d?.phoneNumber, [Validators.required]],
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  fetchUser() {
    const user = this.userService.getUser();
    if (user) {
      this.makeInfoForm(user);
      this.makePasswordForm(user);

    }
  }
  async submitProfile() {
    if (this.profileForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Vui lòng nhập đầy đủ thông tin',
        mode: 'ios',
        duration: 1000,
        position: 'top',
      });
      toast.present();
      return;
    }
    this.apiService
      .updateProfile(this.profileForm.value)
      .subscribe(async (res: any) => {
        const toast = await this.toastCtrl.create({
          message: 'Sửa thông tin thành công',
          mode: 'ios',
          duration: 1000,
          position: 'top',
        });
        this.userService.saveUser(this.profileForm.value);
        toast.present();
      });
  }
  async submitPassword() {
    if (this.passwordForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Vui lòng nhập đầy đủ thông tin',
        mode: 'ios',
        duration: 1000,
        position: 'top',
      });
      toast.present();
      return;
    }
    if(this.passwordForm.get('newPassword').value !== this.passwordForm.get('confirmPassword').value){
      const toast = await this.toastCtrl.create({
        message: 'Mật khẩu mới không khớp',
        mode: 'ios',
        duration: 1000,
        position: 'top',
      });
      toast.present();
      return;
    }
    this.apiService
      .changePassword(this.passwordForm.value)
      .subscribe(
        {
          next: async (res: any) => {
            const toast = await this.toastCtrl.create({
              message: 'Đổi mật khẩu thành công',
              mode: 'ios',
              duration: 1000,
              position: 'top',
            });
            toast.present();
            this.passwordForm.reset();
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
        }
      );
  }
}
