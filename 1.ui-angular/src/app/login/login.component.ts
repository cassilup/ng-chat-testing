import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // @Input() outsideData;

  constructor(private authenticationService: AuthenticationService) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('')
  })

  doLogin = function() {
    this.authenticationService.login(this.loginForm.value).subscribe((result) => {
      console.log("in login.component.ts", result);
    });
  }
}
