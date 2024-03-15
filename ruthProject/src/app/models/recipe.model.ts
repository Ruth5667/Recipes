import { Category } from "./category.model"
import { User } from "./user.model"

export class Recipe {
    public static num = 0;
    idRecipe!: number
    recipeName!: string
    preparationTimeInMinutes!: number
    difficultyLevel!: number
    categoryId!: Category
    dateOfAddTheRecipe!: Date

    ingredients!: string[]
    preparation!: string[]
    idUser!: User
    imag7!: string
}



