import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthorizationService } from '../../service/authorization/authorization.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
    providers: [AuthorizationService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private messageService: NzMessageService,
              private authService: AuthorizationService) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
        this.authService.login(params).subscribe(res => {
            if (res && res.success === true) {
                this.messageService.success(res.message);
                this.router.navigate(['home']);
            } else {
                this.messageService.error(res.message);
            }
        });

    }
  }

}
