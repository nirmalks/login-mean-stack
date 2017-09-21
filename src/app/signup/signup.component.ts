import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userDetails: User;
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder , private userService : UserService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  googleSignup(){
    console.log("Google signup clicked");
    window.open('http://localhost:3000/google');
  }

   signup() {
    console.log("login clicked");
     this.userDetails = this.userForm.value;
     console.log(this.userDetails);
     this.userService.saveUser(this.userDetails).subscribe(
       data => {
         console.log(data);
       } , 
       err => {
         console.log(err);
       }
     )
  }

  createForm() {
       this.userForm = this.fb.group({
      username: ['', [Validators.required]  ],
      email: ['', [Validators.required, Validators.email]  ],
      password: ['', [Validators.required] ],
    });
  }
}
