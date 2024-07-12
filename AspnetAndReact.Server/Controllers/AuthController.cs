﻿using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;

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
        public (string token, string type) login(string username, string password)
        {
            var result = crypto.VerifyUser(username, password);
            if (!result.verified)
            {
                return ("Incorrect Username or Password", "");
            }
            return (result.token, result.type);
        }
    }
}