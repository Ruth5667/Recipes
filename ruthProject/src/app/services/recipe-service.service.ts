import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private _http: HttpClient) { }
  getRecipesList(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(`https://localhost:7093/api/Recipe`)
  }
  addRecipe(recipe:Recipe){
    return this._http.post(`https://localhost:7093/api/Recipe`,recipe)
  }
  getRecipeById(id: number): Observable<Recipe> {
    return this._http.get<Recipe>(`https://localhost:7093/api/Recipe/${id}`)
  }
  putRecipe(recipe: Recipe){
    return this._http.put(`https://localhost:7093/api/Recipe/id?id=${recipe.idRecipe}`,recipe)
  }
  delete(id: number){
    // let options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   id: id,
    // };
    return this._http.delete(`https://localhost:7093/api/Recipe/${id}`)
  }
}