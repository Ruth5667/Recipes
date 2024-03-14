using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RuthInbal_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category>()
        {
            new Category(){Id=1, Name="Cake",IconPath="https://img.lovepik.com/element/45013/6023.png_300.png"},
            new Category(){Id=2, Name="hot drink",IconPath="https://publicdomainvectors.org/tn_img/tea-with-lemon-publicdomain.webp"},
            new Category(){Id=3, Name="vegetables",IconPath="https://greissdesign.com/wp-content/uploads/2016/03/Vegetables_on_Wood-s.jpg"}
        };
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
