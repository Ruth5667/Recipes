import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent) },
    {
        path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        children: [
            { path: 'allRecipes', loadComponent: () => import('./all-recipes/all-recipes.component').then(c => c.AllRecipesComponent) },
            { path: 'addRecipe', loadComponent: () => import('./add-recipe/add-recipe.component').then(c => c.AddRecipeComponent) },
            { path: 'editRecipe/:codeRecipe', loadComponent: () => import('./edit-recipe/edit-recipe.component').then(c => c.EditRecipeComponent) },
            { path: 'smallRecipe', loadComponent: () => import('./small-recipe/small-recipe.component').then(c => c.SmallRecipeComponent) },
            { path: 'detailsRecipe/:idRecipe', loadComponent: () => import('./details-recipe/details-recipe.component').then(c => c.DetailsRecipeComponent) }
        ]
    },
];
