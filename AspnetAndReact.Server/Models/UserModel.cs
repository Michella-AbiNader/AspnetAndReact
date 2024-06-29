using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Type { get; set; }
        public string? Token{ get; set; }



    }
}