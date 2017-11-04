import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSemanticModule } from "ng-semantic";
import { User } from '../shared/user';
import { UserService } from '../services/user-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  profileDetails : any;
  currentUser : any; 
  constructor(private fb : FormBuilder , private userService : UserService) { 
    this.createForm();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  submit(){
    this.currentUser.password = this.profileForm.value.password;
    this.currentUser.phone = this.profileForm.value.phone;
    this.currentUser.city = this.profileForm.value.city;
    this.userService.updateUser(this.currentUser).subscribe(
       data => {
       },
       err => {
       }
     );;
  }

   createForm() {
      this.profileForm = this.fb.group({
      password: [''],
      city: [''],
      phone: [''],
    });
  }
}
