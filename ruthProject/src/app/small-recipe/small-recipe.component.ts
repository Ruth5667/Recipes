import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyTimePipe } from "../format-time.pipe";

@Component({
    selector: 'app-small-recipe',
    standalone: true,
    templateUrl: './small-recipe.component.html',
    styleUrl: './small-recipe.component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MyTimePipe]
})
export class SmallRecipeComponent implements OnInit{
  @Input() recipee!: Recipe
  numberOfStars!: number;
  stars!:number[]
  constructor( private router: Router) { }
  ngOnInit(): void {
    this.numberOfStars = this.recipee.difficultyLevel;
    this.stars = Array.from({ length: this.numberOfStars }, (_, index) => index + 1);
  }
  showAllDetails():void
  {
    if(sessionStorage.getItem("currentUserId")){
     this.router.navigate(["home",'detailsRecipe',this.recipee.idRecipe]);
    }
    else{
      alert("You must login before")
    }
  }
}
