import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: User;
  constructor(private fb: FormBuilder , private userService : UserService) {
    this.createForm();
   }

  ngOnInit() {
  }

  login() {
    console.log("login clicked");
     this.loginDetails = this.loginForm.value;
     this.userService.loginUser(this.loginDetails).subscribe(
       data => {
         console.log(data);
       },
       err => {
         console.log(err);
       }
     );
     console.log(this.loginDetails);
  }

  createForm() {
       this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]  ],
      password: ['', [Validators.required] ],
    });
  }
}
