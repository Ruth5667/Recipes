using System.Collections.Generic;

namespace RuthInbal_Api
{
    public class Recipe
    {
        public int IdRecipe { get; set; }
        public string RecipeName { get; set; }
        public Category? CategoryId { get; set; }
        public DateTime? DateOfAddTheRecipe { get; set; }
        public List<string>? Ingredients { get; set; }
        public List<string>? Preparation { get; set; }
        public double PreparationTimeInMinutes { get; set; }
        public int DifficultyLevel { get; set; }
        public User? IdUser { get; set; }
        public string Imag7 { get; set; }
    }
}
