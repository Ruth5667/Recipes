import { Component, Input } from '@angular/core';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SmallRecipeComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  @Input() 
  recipe!:Recipe

  DetailsForm: FormGroup = new FormGroup({
    "recipe_code": new FormControl("", [Validators.required, Validators.minLength(9)]),
    "Recipe_name": new FormControl("", [Validators.required, Validators.minLength(9)]),
    "category_code": new FormControl("", [Validators.required, Validators.minLength(9)]),
    "Preparation_time_in_minutes": new FormControl("", [Validators.required, Validators.minLength(3)]),
    "Difficulty_level_1_5": new FormControl("", [Validators.required, Validators.min(1), Validators.max(5)]),
    "the_list_of_components": new FormControl("", [Validators.required, Validators.minLength(9)]),
    "preparation": new FormControl("", [Validators.required, Validators.minLength(9)]),
    "image": new FormControl("", [Validators.required, Validators.minLength(3)]),
  });
  constructor(private _recipeService: RecipeServiceService,
    private router: Router) {
  }
  save() {
    this._recipeService.putRecipe(this.DetailsForm.value as Recipe).subscribe(
      {
      error: (err) =>
      console.log("תוכן התשובה:", err),
      next: (response) => {
        console.log("תוכן התשובה:", response);
        // this.response=response
      }
      }
    )
  }
  back() {
    this.router.navigate(['allRecipes']);
  }
}

