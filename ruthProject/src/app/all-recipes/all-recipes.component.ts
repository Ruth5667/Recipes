import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../services/recipe-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CategoryServiceService } from '../services/category-service.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SmallRecipeComponent],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit {
  public recipesList: Recipe[] = [];
  public recipesListByFilter: Recipe[] = [];
  public categoryList: Category[] = []
  filterForm: FormGroup = new FormGroup({
    categoryId: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null),
    durinigTimeOfPreparation: new FormControl<number | null>(null),
  })
  constructor(private _recipeService: RecipeServiceService, private _categoryService: CategoryServiceService) { }
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(form=>{
      this.recipesListByFilter=this.recipesList
    if(form.categoryId)
      this.recipesListByFilter=this.recipesList.filter(r=>r.categoryId.id===+form.categoryId);
      if(form.name)
      this.recipesListByFilter=this.recipesList.filter(r=>r.recipeName.toLocaleLowerCase().includes(form.name.toLocaleLowerCase()))
      if(form.durinigTimeOfPreparation)
      this.recipesListByFilter=this.recipesList.filter(r=>r.preparationTimeInMinutes===form.durinigTimeOfPreparation)
    })
    this._recipeService.getRecipesList().subscribe(
      {
        next: (resp) => {
          this.recipesList = resp;
          this.recipesListByFilter=this.recipesList
        }
      })

    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
}

