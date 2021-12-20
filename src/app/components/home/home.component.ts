import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModel } from 'src/app/models/toast';
import { UserModel } from 'src/app/models/userModels';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ],
})
export class HomeComponent implements OnInit {
  userModel: UserModel | undefined;

  updateUserInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
  });
  updatePasswordForm  = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    public toastService: ToastService,
    private subjects: SubjectsDataService,
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sharedService.activePage='Home';
    this.userModel = JSON.parse(JSON.stringify(this.sharedService.user));
    this.updateUserInfoForm.controls.name.setValue(this.userModel?.name);
    this.updateUserInfoForm.controls.email.setValue(this.userModel?.email);
    this.updateUserInfoForm.controls.phone.setValue(this.userModel?.phone);
  }

  updateUserInfo = () => {
    if (this.validateUserInfo()) {
      const request = {
        name: this.updateUserInfoForm.value.name,
        email: this.updateUserInfoForm.value.email,
        phone: this.updateUserInfoForm.value.phone,
      };
      this.sharedService.changeUserInfo(request);
    }
  }

  updatePassword = () => {
    if (this.validatePassword()) {
      const request = {
        password: this.updatePasswordForm.value.newPassword,
        oldPassword: this.updatePasswordForm.value.oldPassword,
      };
      this.sharedService.changePassword(request);
    }
  }

  validateUserInfo = () => {
    if (this.updateUserInfoForm.invalid) {
      if(this.updateUserInfoForm.controls.name.invalid){
        this.sharedService.warningToast('Name must be at least 5 symbols');
      }
      if(this.updateUserInfoForm.controls.email.invalid){
        this.sharedService.warningToast('Invalid email format'); 
      }
      if(this.updateUserInfoForm.controls.phone.invalid){
        this.sharedService.warningToast('Invalid phone format');   
      }
      return false;
    }    
    return true;
  }
  validatePassword = () => {
    if (this.updatePasswordForm.invalid) {
      if(this.updatePasswordForm.controls.oldPassword.invalid){
        this.sharedService.warningToast('Invalid Password'); 
      }
      if(this.updatePasswordForm.controls.newPassword.invalid){
        this.sharedService.warningToast('Password must be at least 5 symbols'); 
      }
      return false;
    }
    return true;
  }
}
