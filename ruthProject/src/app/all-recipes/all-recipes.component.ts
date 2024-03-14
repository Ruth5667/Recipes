import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SmallRecipeComponent],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit {
  public recipesList: Recipe[] = []
  constructor(private _recipeService: RecipeServiceService) { }
  ngOnInit(): void {
    this._recipeService.getRecipesList().subscribe(
      {
        next: (resp) => {
          this.recipesList = resp;
        }
      })
  }


}

