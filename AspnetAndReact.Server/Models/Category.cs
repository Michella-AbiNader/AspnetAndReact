using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string ImageUrl{ get; set; }

    }
}
