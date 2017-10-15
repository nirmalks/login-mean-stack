import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: User;
  returnUrl: string;
  constructor(private fb: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService
    , private router: Router, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    console.log("login clicked");
    this.loginDetails = this.loginForm.value;
    this.authenticationService.login(this.loginDetails).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        console.log(err);
        console.log("invalid username/password");
      }
    );
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
