import { Component, OnInit } from '@angular/core';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Router } from '@angular/router';
// import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-details-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SmallRecipeComponent],
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.css'
})
export class DetailsRecipeComponent implements OnInit {

  public recipe!: Recipe
  public recipeId!: number
  numberOfStars!: number;
  stars!: number[]
  constructor(private router: Router, private route: ActivatedRoute, private _reciprService: RecipeServiceService) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.recipeId = param["idRecipe"]
      this._reciprService.getRecipeById(this.recipeId).subscribe({
        next: (res) => {
          // alert(res);
          this.recipe = res,
            console.log("good")
          this.numberOfStars = this.recipe.difficultyLevel;
          this.stars = Array.from({ length: this.numberOfStars }, (_, index) => index + 1);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })

  }
  deleteRecipe() {
    this._reciprService.delete(this.recipeId).subscribe({
      next: () => {
        this.router.navigate(["allRecipes"])

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updateRecipe() {
    this.router.navigate(["editRecipe"])

  }
}
