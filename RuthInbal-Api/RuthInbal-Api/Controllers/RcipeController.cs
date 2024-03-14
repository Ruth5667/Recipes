using Microsoft.AspNetCore.Mvc;

namespace RuthInbal_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private static int num = 0;
        private static User user = new User { Id = 3, UserName = "keila", Adress = "pejo", Mail = "a@gmail.com", Password = 9874 };
        private static Category category = new Category{ Id =1, Name = "Cake", IconPath = ""};
        private static List<string> listOfIngredients = new List<string>{ "milk", "2 eggs" };
        private static Recipe recipe1 = new Recipe
        {
            IdRecipe = 1,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category,
            Imag7 = "https://cdna.wobily.com/images/5223a2d2-5755-4c12-a98a-0930d9149e2e_500.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        }; private static Recipe recipe2 = new Recipe
        {
            IdRecipe = 1,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category,
            Imag7 = "https://marianacakes.com/wp-content/uploads/2021/01/weddingcake2.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        };

        private static List<Recipe> recipes = new List<Recipe> { recipe1, recipe2 };


        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }

        [HttpGet("{id}")]
        public Recipe GetById(int id)
        {
            return recipes.Where(x => x.IdRecipe == id).FirstOrDefault();
        }
        [HttpPost]
        public void Post([FromBody] Recipe recipe)
        {
            recipe.IdRecipe = num++;
            recipe.IdUser = user;
            recipes.Add(recipe);
        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe recipe)
        {
            Recipe recipeToUpdate = recipes[id - 1];
            recipeToUpdate.IdRecipe = id;
            if (recipe.CategoryId != null)
                recipeToUpdate.CategoryId = recipe.CategoryId;
            if (recipe.IdUser != null)
                recipe.IdUser = recipe.IdUser;
            if (recipe.Ingredients != null)
                recipeToUpdate.Ingredients = recipe.Ingredients;
            if (recipe.RecipeName != null)
                recipeToUpdate.RecipeName = recipe.RecipeName;
            if (recipe.DateOfAddTheRecipe != DateTime.MinValue)
                recipeToUpdate.DateOfAddTheRecipe = recipe.DateOfAddTheRecipe;
            if (recipe.DifficultyLevel != 0)
                recipeToUpdate.DifficultyLevel = recipe.DifficultyLevel;
            if (recipe.Imag7 != null)
                recipeToUpdate.Imag7 = recipe.Imag7;
            if (recipe.Preparation != null)
                recipeToUpdate.Preparation = recipe.Preparation;
            if (recipe.PreparationTimeInMinutes != 0)
                recipeToUpdate.PreparationTimeInMinutes = recipe.PreparationTimeInMinutes;
        }
        [HttpDelete("{id}")]
        public void Delete([FromRoute] int id)
        {
            var currentRecipe = recipes.Where(x => x.IdRecipe == id).FirstOrDefault();
            recipes.Remove(currentRecipe);
        }
    }
}
