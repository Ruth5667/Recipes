using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace RuthInbal_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private static int num = 0;
        private static User user = new User { Id = 3, UserName = "keila", Adress = "pejo", Mail = "a@gmail.com", Password = 9874 };
        private static Category category1 = new Category() { Id = 1, Name = "Cake", IconPath = "https://img.lovepik.com/element/45013/6023.png_300.png" };
        private static Category category2 = new Category() { Id = 1, Name = "Cake", IconPath = "https://img.lovepik.com/element/45013/6023.png_300.png" };
        private static Category category = new Category() { Id = 2, Name = "hot drink", IconPath = "https://publicdomainvectors.org/tn_img/tea-with-lemon-publicdomain.webp" };
        private static Category category3 = new Category() { Id = 3, Name = "vegetables", IconPath = "https://greissdesign.com/wp-content/uploads/2016/03/Vegetables_on_Wood-s.jpg" };
        private static List<string> listOfIngredients = new List<string> { "milk", "2 eggs" };
        private static Recipe recipe1 = new Recipe
        {
            IdRecipe = 1,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category1,
            Imag7 = "https://greissdesign.com/wp-content/uploads/2019/07/pasta-S.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        }; private static Recipe recipe2 = new Recipe
        {
            IdRecipe = 2,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category1,
            Imag7 = "https://greissdesign.com/wp-content/uploads/2019/07/food1-Freebies-S.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        }; private static Recipe recipe3 = new Recipe
        {
            IdRecipe = 3,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category2,
            Imag7 = "https://greissdesign.com/wp-content/uploads/2016/03/Food_Sandwich-Food-S.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        };
        private static Recipe recipe4 = new Recipe
        {
            IdRecipe = 4,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category3,
            Imag7 = "https://greissdesign.com/wp-content/uploads/2019/07/food2-Freebies-S.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        };
        private static Recipe recipe5 = new Recipe
        {
            IdRecipe = 5,
            RecipeName = "BirthdayCake",
            DifficultyLevel = 2,
            IdUser = user,
            DateOfAddTheRecipe = DateTime.Now,
            Preparation = new List<string> { "put all the products in the box", "mix all the products" },
            CategoryId = category3,
            Imag7 = "https://greissdesign.com/wp-content/uploads/2019/07/pasta-S.jpg",
            PreparationTimeInMinutes = 35.0,
            Ingredients = listOfIngredients
        };
        private static List<Recipe> recipes = new List<Recipe> { recipe1, recipe2, recipe3, recipe4, recipe5 };


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
