import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.less'],
  providers: [AuthorizationService]
})
export class RegistComponent implements OnInit {

  validateForm: FormGroup;

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
            return { error: true, required: true };
      } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
      }
      return {};
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: NzMessageService,
              private authService: AuthorizationService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [this.confirmValidator]],
      // phoneNumberPrefix: ['+86'],
      // phoneNumber: [null, [Validators.required]],
      // messageCode: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
      }
    }
      if (this.validateForm.status === 'VALID') {

          const params = {
              userName: this.validateForm.get('userName').value,
              password: this.validateForm.get('password').value
          }
          this.authService.regist(params).subscribe(res => {
              if (res && res.success === true) {
                  this.messageService.success(res.message);
                  this.router.navigate(['index/login']);
              } else {
                  this.messageService.error(res.message);
              }
          });

      }
  }

}
