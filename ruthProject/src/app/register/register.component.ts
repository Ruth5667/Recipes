import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  RegisterForm: FormGroup = new FormGroup({
    "id": new FormControl(""),
    "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
    "adress": new FormControl(""),
    "password": new FormControl("", [Validators.required]),
    "email": new FormControl("")

  })
//  public currentUser =this.RegisterForm as User;
//    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  public res!:boolean
  constructor(private _userService: UserServiceService, private router: Router) { }
  ngOnInit(): void {
 alert("Unregistered user! Enter user details")  }
  login() {
    this._userService.register(this.RegisterForm.value as User).subscribe(
      {
        error: () => this.res=true,
        next: () => {
          this.router.navigate(["allRecipes"]);
          }
      });
  }
}
