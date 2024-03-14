using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace RuthInbal_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User> {
            new User{Id = 1, UserName = "Nechama", Adress = "Ginot-David", Mail = "Nechama@gmail.com", Password = 1234 },
            new User{Id = 2, UserName = "Moishe", Adress = "Ben-David", Mail = "Moishe@gmail.com", Password = 34 },
        };
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }
        [HttpGet("{id}")]
        public User Get(int id)
        {
            var user = users[id - 1];
            return user;
        }
        //[Route("login")]
        //[HttpPost]
        //public bool Post([FromBody] User user) 
        //{
        //    try
        //    {
        //        if (users.Where(x => x.UserName == user.UserName && x.Password == user.Password).ToList().Count > 0)
        //            return true;
        //        else if (users.Where(y => y.UserName == user.UserName).ToList().Count > 0)
        //            return false;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"the user not found {ex}");
        //    }

        //}
        [Route("login")]
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                var foundUser = users.First(x => x.UserName == user.UserName);

                if (foundUser != null)
                {
                    if (foundUser.Password == user.Password)
                        return Ok(true); // מחזיר 200 OK עם ערך true
                    else
                        return Ok(false); // מחזיר 200 OK עם ערך false
                }
                else
                {
                    Console.WriteLine("the user not found");
                    return NotFound(); // מחזיר 404 Not Found
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"); // מחזיר 500 Internal Server Error
            }
        }

        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            try
            {
                var foundUser = users.Where(x => x.UserName == user.UserName && x.Password == user.Password).ToList();
                if (foundUser.Count > 0)
                    return NotFound();

                users.Add(user);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"); // מחזיר 500 Internal Server Error
            }
        }
    }
}
