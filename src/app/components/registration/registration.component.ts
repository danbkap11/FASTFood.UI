import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModel } from 'src/app/models/toast';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ],
})
export class RegistrationComponent implements OnInit {

  regForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
  });

  constructor(
    public toastService: ToastService,
    private subjects: SubjectsDataService,
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sharedService.activePage = "Registration";
  }
  
  tryRegiter = () => {
    if (this.validate()) {
      if(this.regForm.controls.confirmPassword.value !== this.regForm.controls.password.value){
        this.sharedService.warningToast('Passwords must match');
      } else {
        const request = {
          login: this.regForm.controls.login.value,
          password: this.regForm.controls.password.value,
          name: this.regForm.controls.name.value,
          email: this.regForm.controls.email.value,
          phone: this.regForm.controls.phone.value,
        };
        this.sharedService.tryRegister(request);
      }
    }
  }

  validate = () => {
    if (this.regForm.invalid) {
      if(this.regForm.controls.login.invalid){
        this.sharedService.warningToast('Login must be at least 4 symbols');    
      }
      if(this.regForm.controls.password.invalid){
        this.sharedService.warningToast('Password must be at least 5 symbols');
      }
      if(this.regForm.controls.name.invalid){
        this.sharedService.warningToast('Name must be at least 5 symbols');
      }
      if(this.regForm.controls.email.invalid){
        this.sharedService.warningToast('Invalid email format'); 
      }
      if(this.regForm.controls.phone.invalid){
        this.sharedService.warningToast('Invalid phone format');   
      }
      return false;
    }    
    return true;
  }

}
