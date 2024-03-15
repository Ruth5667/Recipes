import { Component, Input } from '@angular/core';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServiceService } from '../services/recipe-service.service';
import { MyTimePipe } from "../format-time.pipe";

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SmallRecipeComponent, MyTimePipe]
})
export class EditRecipeComponent {
  @Input()
  recipe!: Recipe
  codeRecipe!: number
  DetailsForm: FormGroup = new FormGroup({
    "idRecipe": new FormControl(0, [Validators.required]),
    "recipeName": new FormControl("", [Validators.required]),
    "preparationTimeInMinutes": new FormControl(0, [Validators.required]),
    "difficultyLevel": new FormControl(1, [Validators.required, Validators.max(5), Validators.min(1)]),
    "categoryId": new FormControl(-1, [Validators.required]),
    "dateOfAddTheRecipe": new FormControl(new Date(), [Validators.required]),
    "ingredients": new FormArray([], [Validators.required]),
    "preparation": new FormArray([], [Validators.required]),
    "idUser": new FormControl(0),
    "imag7": new FormControl("")
  });

  get preparation() {
    return this.DetailsForm.get('preparation') as FormArray;
  }
  get ingredients() {
    return this.DetailsForm.get('ingredients') as FormArray;
  }

  addNewPreparation() {
    this.preparation.push(new FormControl(''));
  }

  removePreparation(index: number) {
    this.preparation.removeAt(index)
  }
  addNewIngredients() {
    this.ingredients.push(new FormControl(''));
  }
  removeIngredients(index: number) {
    this.ingredients.removeAt(index)
  }

  get componentsArray() {
    return this.DetailsForm.controls["the_list_of_component"] as FormArray;
  }
  constructor(private _recipeService: RecipeServiceService,
    private router: Router, private route: ActivatedRoute) {
  }
  back() {
    this.router.navigate(["home",'allRecipes']);
  }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.codeRecipe = param['codeRecipe']
    });
    this._recipeService.getRecipeById(this.codeRecipe).subscribe({
      next: (res) => {
        this.DetailsForm.setValue({ ...res, preparation: [], ingredients: []});
        this.DetailsForm.removeControl("idUser");
        const preparationLength = res.preparation ?? []
        for (let i = 0; i < preparationLength.length; i++) {
          this.addNewPreparation();
          this.preparation.controls[i].setValue(preparationLength[i])
        }
        const ingredientsLength = res.ingredients ?? []
        for (let i = 0; i < ingredientsLength.length; i++) {
          this.addNewIngredients();
          this.ingredients.controls[i].setValue(ingredientsLength[i])
        }
      },
    })
  }
  save() {
    if (this.DetailsForm.invalid) {
      alert("שדות חובה")
    }
    else {
      this._recipeService.putRecipe(this.DetailsForm.value).subscribe(
        {
          error: (err) =>
            console.log("תוכן התשובה:", err),
          next: (response) => {
            console.log("תוכן התשובה:", response);
          }
        }
      )
    }
  }
}
