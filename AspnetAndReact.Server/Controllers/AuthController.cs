using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspnetAndReact.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        Cryptography crypto = new Cryptography();
        [HttpPost]
        public string register(User user)
        {
            UserController us = new UserController();
            string result = us.Post(user);
            return result;

        }
        [HttpGet]
        public string login(string username, string password)
        {
            var result = crypto.VerifyUser(username, password);
            if (!result.verified)
            {
                var response = new 
                {
                    id = result.id,
                    username = username,
                    res = result.verified,
                    token = result.token,
                    type = result.type
                };
                return JsonConvert.SerializeObject(response);
            }
            if(result.type == "shop admin")
            {
                //fetch the theme color for the shop and send it with the response
            }
            var response2 = new
            {
                id = result.id,
                username = username,
                res = result.verified,
                token = result.token,
                type = result.type
            };
            return  JsonConvert.SerializeObject(response2);
        }
    }
}
