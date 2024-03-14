import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import {AllRecipesComponent} from '../all-recipes/all-recipes.component'
import 'bootstrap';
import 'popper.js';
import 'jquery';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, AllRecipesComponent]
})
export class LoginComponent {
  LoginForm: FormGroup = new FormGroup({
    "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
    "password": new FormControl("", [Validators.required])

  })
  public showLogin: boolean=true
  public showErrorMessege: boolean= false;
//   // קוד TypeScript בקומפוננטה או בסרוויס בהתאם למבנה האפליקציה שלך
// const user = { name: 'John', email: 'john@example.com' };
// sessionStorage.setItem('currentUser', JSON.stringify(user));

  constructor(private _userService: UserServiceService, private router: Router) { }

  login() {
    this._userService.login(this.LoginForm.value as User).subscribe(
      {
        error: (err) => {this.router.navigate(["register"]),
        console.log(err);
      },
        next: (res) => {
          if(!res)
          this.showErrorMessege = true;
        else
        this.showLogin = false;
        }
      })
  }

}
