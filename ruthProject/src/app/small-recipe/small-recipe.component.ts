import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-small-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl:'./small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
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
    this.router.navigate(['detailsRecipe',this.recipee.idRecipe]);
  }
}
