import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userDetails: User;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  googleSignup() {
    window.open('http://localhost:3000/google');
  }

  signup() {
    this.userDetails = this.userForm.value;
    this.userService.saveUser(this.userDetails).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      err => {
      }
    )
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
