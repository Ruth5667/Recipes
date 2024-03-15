import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryServiceService } from '../services/category-service.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  public res!: boolean;
  ingredients = new FormArray([new FormControl("", [Validators.required])]);
  preparation = new FormArray([new FormControl("", [Validators.required])]);

  get ingredientsArray() {
    return this.ingredients as FormArray;
  }
  get preparationArray() {
    return this.preparation as FormArray;
  }
  RecipeForm: FormGroup = new FormGroup({
    "recipeName": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required, Validators.minLength(3)]),
    "preparationTimeInMinutes": new FormControl("", [Validators.required]),
    "difficultyLevel": new FormControl("", [Validators.required, Validators.max(5), Validators.min(1)]),
    "imag7": new FormControl("", [Validators.required]),
    "dateOfAddTheRecipe": new FormControl("", [Validators.required]),
    "category": new FormControl("", [Validators.required]),
    ingredients: this.ingredients,
    preparation: this.preparation

  })

  constructor(private _categoryService: CategoryServiceService, private _recipeService: RecipeServiceService, private router: Router) { }
  public CategoryList: Category[] = []
  ngOnInit(): void {
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.CategoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changeIngredient(value: string | null, index: number) {
    if (this.ingredientsArray.length - 1 == index)
      this.ingredientsArray.push(new FormControl(""));
  }
  changePreparation(value: string | null, index: number) {
    if (this.preparationArray.length - 1 == index)
      this.preparationArray.push(new FormControl(""));
  }
  addRecipe() {
    if (this.ingredientsArray.at(this.ingredientsArray.length - 1).value==="")
      this.ingredientsArray.removeAt(this.ingredientsArray.length - 1)
      if (this.preparationArray.at(this.preparationArray.length - 1).value==="")
      this.preparationArray.removeAt(this.preparationArray.length - 1)
    this._recipeService.addRecipe(
      this.RecipeForm.value as Recipe).subscribe(
        {
          next: () => {
            this.res = true,
              this.router.navigate(["home","allRecipes"])
          }
        })
  }
  showAlert(): void {
    Swal.fire({
      title: 'הודעת ה-Alert',
      text: 'זו הודעה חשובה!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
