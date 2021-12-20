import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ToastModel } from 'src/app/models/toast';
import { SharedService } from 'src/app/service/shared.service';
import { SubjectsDataService } from 'src/app/service/subject.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ],
})
export class LoginComponent implements OnInit {
  logForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    public toastService: ToastService,
    private subjects: SubjectsDataService,
    private sharedService: SharedService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sharedService.activePage = "Login";
  }
  
  tryLogin = () => {
    if (this.validate()) {
      const request = {
        login: this.logForm.value.login,
        password: this.logForm.value.password,
      };
      this.sharedService.user.login = this.logForm.value.login;
      this.sharedService.user.password = this.logForm.value.password;
      this.sharedService.tryLogin(request);
    }
  }

  validate = () => {
    if (this.logForm.value.login.length >= 4 && this.logForm.value.password.length >= 5) {
      return true;
    } 
    const toast = {
      text: 'INVALID LOGIN OR PASSWORD',
      className: 'bg-danger text-light',
      delay: 2000
    } as ToastModel;
    this.subjects.subject(1).next(toast);
    return false;
  }

}
