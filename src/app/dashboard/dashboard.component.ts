import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSemanticModule } from "ng-semantic";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  profileDetails : any;
  constructor(private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  submit(){
    console.log("form submitted");
    this.profileDetails = this.profileForm.value;
    console.log(this.profileDetails);
  }

   createForm() {
       this.profileForm = this.fb.group({
      password: [''],
      city: [''],
      phone: [''],
    });
  }
}
